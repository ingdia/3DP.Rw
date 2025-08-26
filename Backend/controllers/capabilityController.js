// controllers/capabilityController.js
import pool from '../config/db.js';

// @desc    Create a new capability with optional sub-capabilities
// @route   POST /api/capabilities
// @access  Private/Admin
export const createCapability = async (req, res) => {
  const { name, weighting, subCapabilities } = req.body;

  // --- Backend Validation ---
  if (!name || !weighting) {
    return res.status(400).json({ message: 'Name and weighting are required.' });
  }
  if (subCapabilities && subCapabilities.length > 0) {
    const totalSubWeight = subCapabilities.reduce((sum, sub) => sum + sub.weighting, 0);
    if (totalSubWeight > weighting) {
      return res.status(400).json({ message: 'Total sub-capability weight cannot exceed parent weight.' });
    }
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start transaction

    // Insert the main capability
    const newCapabilityResult = await client.query(
      'INSERT INTO capabilities (name, weighting) VALUES ($1, $2) RETURNING id',
      [name, weighting]
    );
    const capabilityId = newCapabilityResult.rows[0].id;

    // Insert sub-capabilities if they exist
    if (subCapabilities && subCapabilities.length > 0) {
      for (const sub of subCapabilities) {
        await client.query(
          'INSERT INTO sub_capabilities (name, weighting, capability_id) VALUES ($1, $2, $3)',
          [sub.name, sub.weighting, capabilityId]
        );
      }
    }

    await client.query('COMMIT'); // Commit transaction
    res.status(201).json({ message: 'Capability created successfully.' });

  } catch (error) {
    await client.query('ROLLBACK'); // Rollback on error
    console.error('Error creating capability:', error);
    if (error.code === '23505') { // Unique constraint violation
        return res.status(400).json({ message: 'A capability with this name already exists.' });
    }
    res.status(500).json({ message: 'Server error while creating capability.' });
  } finally {
    client.release();
  }
};


// @desc    Get all capabilities and their sub-capabilities
// @route   GET /api/capabilities
// @access  Private/Admin
export const getAllCapabilities = async (req, res) => {
  try {
    const query = `
      SELECT
        c.id,
        c.name,
        c.weighting,
        sc.id as "subCapabilityId",
        sc.name as "subCapabilityName",
        sc.weighting as "subCapabilityWeight"
      FROM capabilities c
      LEFT JOIN sub_capabilities sc ON c.id = sc.capability_id
      ORDER BY c.id;
    `;
    const { rows } = await pool.query(query);

    // Aggregate the flat data structure into a nested one
    const capabilitiesMap = {};
    rows.forEach(row => {
      if (!capabilitiesMap[row.id]) {
        capabilitiesMap[row.id] = {
          id: row.id,
          name: row.name,
          weighting: row.weighting,
          subCapabilities: [],
        };
      }
      if (row.subCapabilityId) {
        capabilitiesMap[row.id].subCapabilities.push({
          id: row.subCapabilityId,
          name: row.subCapabilityName,
          weighting: row.subCapabilityWeight,
        });
      }
    });

    res.json(Object.values(capabilitiesMap));

  } catch (error) {
    console.error('Error fetching capabilities:', error);
    res.status(500).json({ message: 'Server error while fetching capabilities.' });
  }
};


// @desc    Update a capability
// @route   PUT /api/capabilities/:id
// @access  Private/Admin
export const updateCapability = async (req, res) => {
  const { id } = req.params;
  const { name, weighting, subCapabilities } = req.body;

  // --- Backend Validation ---
  if (!name || !weighting) {
    return res.status(400).json({ message: 'Name and weighting are required.' });
  }
  if (subCapabilities && subCapabilities.length > 0) {
    const totalSubWeight = subCapabilities.reduce((sum, sub) => sum + (Number(sub.weighting) || 0), 0);
    if (totalSubWeight > weighting) {
      return res.status(400).json({ message: 'Total sub-capability weight cannot exceed parent weight.' });
    }
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start transaction

    // Step 1: Update the main capability details
    await client.query(
      'UPDATE capabilities SET name = $1, weighting = $2 WHERE id = $3',
      [name, weighting, id]
    );

    // Step 2: Delete all existing sub-capabilities for this capability
    await client.query('DELETE FROM sub_capabilities WHERE capability_id = $1', [id]);

    // Step 3: Re-insert the updated sub-capabilities from the request
    if (subCapabilities && subCapabilities.length > 0) {
      for (const sub of subCapabilities) {
        await client.query(
          'INSERT INTO sub_capabilities (name, weighting, capability_id) VALUES ($1, $2, $3)',
          [sub.name, sub.weighting, id]
        );
      }
    }

    await client.query('COMMIT'); // Commit the transaction
    res.json({ message: 'Capability updated successfully.' });

  } catch (error) {
    await client.query('ROLLBACK'); // Rollback on any error
    console.error('Error updating capability:', error);
    if (error.code === '23505') { // Unique constraint violation
        return res.status(400).json({ message: 'A capability with this name already exists.' });
    }
    res.status(500).json({ message: 'Server error while updating capability.' });
  } finally {
    client.release();
  }
};


// @desc    Delete a capability
// @route   DELETE /api/capabilities/:id
// @access  Private/Admin
export const deleteCapability = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM capabilities WHERE id = $1', [id]);

    if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Capability not found.' });
    }

    // ON DELETE CASCADE handles deleting sub-capabilities automatically
    res.json({ message: 'Capability deleted successfully.' });
  } catch (error) {
    console.error('Error deleting capability:', error);
    res.status(500).json({ message: 'Server error while deleting capability.' });
  }
};