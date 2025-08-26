// backend/controllers/aiController.js

import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

// Initialize the AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- THE FIX IS ON THIS LINE ---
// We are updating the outdated "gemini-pro" to the latest, fastest model.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

/**
 * @desc    Generate assessment questions using AI
 * @route   POST /api/ai/generate-questions
 * @access  Private/Admin
 */
export const generateQuestions = async (req, res) => {
    const { capability, subCapability } = req.body;

    if (!capability) {
        return res.status(400).json({ message: 'A capability is required.' });
    }

    const topic = subCapability ? `${capability} with a focus on ${subCapability}` : capability;
    const questionCount = subCapability ? 5 : 10;

    // This prompt is well-engineered to request structured JSON
    const prompt = `
        Generate ${questionCount} multiple-choice assessment questions for a professional data maturity assessment on the topic of "${topic}".
        For each question:
        - The question text should be clear and relevant to the topic.
        - Provide 4 distinct options labeled "A", "B", "C", and "D".
        - One, and only one, of the options must be the correct answer.
        - The other three options should be plausible but incorrect distractors.
        - Assign a default of 1 mark for each question.

        Return the output as a single, minified JSON array of objects. Do not include any text, explanation, or markdown formatting before or after the JSON array.
        Each object in the array should have the following structure:
        {
          "text": "The question text here?",
          "marks": 1,
          "options": [
            {"id": "A", "text": "Option A text."},
            {"id": "B", "text": "Option B text."},
            {"id": "C", "text": "Option C text."},
            {"id": "D", "text": "Option D text."}
          ],
          "correctAnswer": "A"
        }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jsonText = response.text();
        
        // Clean the response just in case the AI wraps it in markdown
        const cleanedJsonText = jsonText.replace(/^```json\s*|```$/g, '');
        
        const questions = JSON.parse(cleanedJsonText);
        res.json(questions);

    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ message: "Failed to generate questions from AI. Please check the server logs." });
    }
};