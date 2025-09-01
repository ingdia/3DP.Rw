// backend/controllers/fieldController.js
import pool from '../config/db.js';

// @desc    Create a new field
// @route   POST /api/fields
export const createField = async (req, res) => {
    const { name, description } = req.body;
    if (!name || name.trim() === '') {
        return res.status(400).json({ message: 'Field name is required.' });
    }
    try {
        const newField = await pool.query(
            'INSERT INTO fields (name, description) VALUES ($1, $2) RETURNING *',
            [name, description || null]
        );
        res.status(201).json(newField.rows[0]);
    } catch (error) {
        console.error("Create Field Error:", error);
        if (error.code === '23505') { // Unique constraint violation
            return res.status(400).json({ message: 'A field with this name already exists.' });
        }
        res.status(500).json({ message: 'Server error while creating field.' });
    }
};

// @desc    Get all fields
// @route   GET /api/fields
export const getAllFields = async (req, res) => {
    try {
        const allFields = await pool.query('SELECT * FROM fields ORDER BY name ASC');
        res.json(allFields.rows);
    } catch (error) {
        console.error("Get All Fields Error:", error);
        res.status(500).json({ message: 'Server error while fetching fields.' });
    }
};

// @desc    Update an existing field
// @route   PUT /api/fields/:id
export const updateField = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name || name.trim() === '') {
        return res.status(400).json({ message: 'Field name is required.' });
    }
    try {
        const updatedField = await pool.query(
            'UPDATE fields SET name = $1, description = $2 WHERE id = $3 RETURNING *',
            [name, description || null, id]
        );
        if (updatedField.rows.length === 0) {
            return res.status(404).json({ message: 'Field not found.' });
        }
        res.json(updatedField.rows[0]);
    } catch (error) {
        console.error("Update Field Error:", error);
        if (error.code === '23505') {
            return res.status(400).json({ message: 'A field with this name already exists.' });
        }
        res.status(500).json({ message: 'Server error while updating field.' });
    }
};

// @desc    Delete a field
// @route   DELETE /api/fields/:id
export const deleteField = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM fields WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Field not found.' });
        }
        // Because of ON DELETE CASCADE, capabilities and questions are deleted automatically.
        res.json({ message: 'Field deleted successfully.' });
    } catch (error) {
        console.error("Delete Field Error:", error);
        res.status(500).json({ message: 'Server error while deleting field.' });
    }
};

// This function is still needed for the question generator page
export const getCapabilitiesForField = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT
                c.id, c.name,
                COALESCE(
                    json_agg(json_build_object('id', sc.id, 'name', sc.name))
                    FILTER (WHERE sc.id IS NOT NULL),
                    '[]'
                ) as "subCapabilities"
            FROM capabilities c
            LEFT JOIN sub_capabilities sc ON c.id = sc.capability_id
            WHERE c.field_id = $1
            GROUP BY c.id, c.name ORDER BY c.name;
        `;
        const { rows } = await pool.query(query, [id]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching capabilities for field:', error);
        res.status(500).json({ message: 'Server error' });
    }
};