import pool from '../config/db.js';

/**
 * @desc    Create a new capability within a specific field
 * @route   POST /api/capabilities
 * @access  Private/Admin
 */
export const createCapability = async (req, res) => {
  // We now expect 'fieldId' in the request body
  const { name, weighting, subCapabilities, fieldId } = req.body;

  // --- Backend Validation ---
  if (!name || !weighting || !fieldId) {
    return res.status(400).json({ message: 'Field ID, Name, and Weighting are required.' });
  }
  if (weighting <= 0) {
    return res.status(400).json({ message: 'Weighting must be a positive number.' });
  }

  const client = await pool.connect();
  try {
    // A transaction ensures this entire operation succeeds or fails together
    await client.query('BEGIN');

    // Step 1: Insert the main capability, linking it to the fieldId
    const newCapabilityResult = await client.query(
      'INSERT INTO capabilities (name, weighting, field_id) VALUES ($1, $2, $3) RETURNING id',
      [name, weighting, fieldId]
    );
    const capabilityId = newCapabilityResult.rows[0].id;

    // Step 2: Insert the associated sub-capabilities, if any are provided
    if (subCapabilities && subCapabilities.length > 0) {
      for (const sub of subCapabilities) {
        if (sub.name && sub.name.trim() !== '' && Number(sub.weighting) > 0) {
            await client.query(
                'INSERT INTO sub_capabilities (name, weighting, capability_id) VALUES ($1, $2, $3)',
                [sub.name, sub.weighting, capabilityId]
            );
        }
      }
    }

    await client.query('COMMIT'); // Commit the transaction
    res.status(201).json({ message: 'Capability created successfully.', capabilityId });

  } catch (error) {
    await client.query('ROLLBACK'); // Rollback on any error
    console.error('Error creating capability:', error);
    if (error.code === '23505') { // Unique constraint violation (e.g., duplicate name)
        return res.status(400).json({ message: 'A capability with this name may already exist in this field.' });
    }
    res.status(500).json({ message: 'Server error while creating capability.' });
  } finally {
    client.release(); // Release the database client back to the pool
  }
};


/**
 * @desc    Update a capability and its sub-capabilities
 * @route   PUT /api/capabilities/:id
 * @access  Private/Admin
 */
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
    await client.query('BEGIN');

    // Step 1: Update the main capability's details
    const result = await client.query(
      'UPDATE capabilities SET name = $1, weighting = $2 WHERE id = $3 RETURNING id',
      [name, weighting, id]
    );

    if (result.rowCount === 0) {
        throw new Error('Capability not found');
    }

    // Step 2: Delete all old sub-capabilities associated with this capability.
    // This is the simplest and most robust way to handle edits, additions, and removals.
    await client.query('DELETE FROM sub_capabilities WHERE capability_id = $1', [id]);

    // Step 3: Re-insert the updated list of sub-capabilities
    if (subCapabilities && subCapabilities.length > 0) {
      for (const sub of subCapabilities) {
        if (sub.name && sub.name.trim() !== '' && Number(sub.weighting) > 0) {
            await client.query(
                'INSERT INTO sub_capabilities (name, weighting, capability_id) VALUES ($1, $2, $3)',
                [sub.name, sub.weighting, id]
            );
        }
      }
    }

    await client.query('COMMIT');
    res.json({ message: 'Capability updated successfully.' });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating capability:', error);
    if (error.message === 'Capability not found') {
        return res.status(404).json({ message: 'Capability not found.' });
    }
    if (error.code === '23505') {
        return res.status(400).json({ message: 'A capability with this name may already exist in this field.' });
    }
    res.status(500).json({ message: 'Server error while updating capability.' });
  } finally {
    client.release();
  }
};


/**
 * @desc    Delete a capability
 * @route   DELETE /api/capabilities/:id
 * @access  Private/Admin
 */
export const deleteCapability = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM capabilities WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Capability not found.' });
    }

    // Because of 'ON DELETE CASCADE' in the database schema, all associated
    // sub_capabilities (and their questions, if linked) will be deleted automatically.
    res.json({ message: 'Capability deleted successfully.' });
  } catch (error) {
    console.error('Error deleting capability:', error);
    res.status(500).json({ message: 'Server error while deleting capability.' });
  }
};

// NOTE: We no longer export a generic `getAllCapabilities` function.
// All capability fetching should be done via the `getCapabilitiesForField`
// function, which now resides in `fieldController.js`.