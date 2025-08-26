// backend/controllers/questionController.js

import pool from '../config/db.js';

/**
 * @desc    Save a batch of questions and their options from the AI generator
 * @route   POST /api/questions
 * @access  Private/Admin
 */
export const saveBatchQuestions = async (req, res) => {
    const { questions, capabilityId, subCapabilityId } = req.body;
    
    // Backend validation
    if (!questions || questions.length === 0 || !capabilityId) {
        return res.status(400).json({ message: 'A capability ID and a list of questions are required.' });
    }

    const client = await pool.connect();
    try {
        // Use a transaction to ensure all questions and options are saved, or none are.
        await client.query('BEGIN');

        for (const q of questions) {
            // 1. Insert the question into the 'questions' table
            const questionResult = await client.query(
                `INSERT INTO questions (text, marks, capability_id, sub_capability_id) 
                 VALUES ($1, $2, $3, $4) RETURNING id`,
                [q.text, q.marks, capabilityId, subCapabilityId || null]
            );
            const questionId = questionResult.rows[0].id;

            // 2. Insert all of its options into the 'options' table
            for (const opt of q.options) {
                await client.query(
                    `INSERT INTO options (text, is_correct, question_id) 
                     VALUES ($1, $2, $3)`,
                    [opt.text, opt.id === q.correctAnswer, questionId]
                );
            }
        }

        await client.query('COMMIT'); // Commit the transaction if all insertions were successful
        res.status(201).json({ message: 'Questions saved successfully.' });
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback the transaction on any error
        console.error("Error saving batch questions:", error);
        res.status(500).json({ message: 'Failed to save questions to the database.' });
    } finally {
        client.release(); // Release the database client back to the pool
    }
};

/**
 * @desc    Get all saved questions along with their capabilities and options
 * @route   GET /api/questions
 * @access  Private/Admin
 */
export const getAllQuestions = async (req, res) => {
    try {
        // This is a more advanced query that joins all the tables together to give the frontend all the info it needs.
        const query = `
            SELECT 
                q.id, 
                q.text, 
                q.marks,
                cap.name as capability,
                sub.name as "subCapability",
                (
                    SELECT json_agg(o.*)
                    FROM options o
                    WHERE o.question_id = q.id
                ) as options
            FROM questions q
            LEFT JOIN capabilities cap ON q.capability_id = cap.id
            LEFT JOIN sub_capabilities sub ON q.sub_capability_id = sub.id
            ORDER BY q.id DESC;
        `;
        const { rows } = await pool.query(query);

        // Map the data to match the frontend's expected format
        const formattedQuestions = rows.map(row => {
            const correctAnswer = row.options?.find(opt => opt.is_correct)?.id.toString() || null;
            return {
                id: row.id,
                text: row.text,
                capability: row.capability,
                subCapability: row.subCapability,
                marks: row.marks,
                correctAnswer: correctAnswer, // You might need to adjust based on how you store/represent option IDs ('A', 'B', 'C', 'D' vs. numeric IDs)
                options: row.options || [],
            }
        })

        res.json(formattedQuestions);
    } catch (error) {
        console.error("Error fetching all questions:", error);
        res.status(500).json({ message: 'Server error while fetching questions.' });
    }
};

/**
 * @desc    Delete a single question (and its options via CASCADE)
 * @route   DELETE /api/questions/:id
 * @access  Private/Admin
 */
export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM questions WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Question not found.' });
        }

        res.json({ message: 'Question deleted successfully.' });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ message: 'Server error while deleting question.' });
    }
};