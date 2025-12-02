// src/services/gitaService.js

import { gemini } from "../config/gemini.js";

/**
 * Get a spiritual answer inspired by the Bhagavad Gita using Gemini.
 *
 * @param {string} question  - User's question / problem.
 * @param {("hindi"|"hinglish"|"english")} [language="hinglish"] - Preferred response language.
 * @param {string} [userName] - Optional user name to address respectfully.
 * @returns {Promise<string>} - Spiritual answer text.
 */
export async function getGitaAnswer(question, language = "hinglish", userName = "") {
    try {
        // Language-specific instructions
        const languageMap = {
            hindi: "Reply strictly in simple, clear Hindi (Devanagari). Do not mix English words unless absolutely necessary.",
            hinglish: "Reply in Hinglish – Hindi content written in Roman script, with some light English mixing, like people chat on WhatsApp.",
            english: "Reply strictly in simple, clear English, easy for an Indian reader to understand."
        };

        const languageInstruction = languageMap[language] || languageMap.hinglish;

        // Name usage instruction
        const nameInstruction = userName
            ? `Address the user respectfully as "${userName}" at a few natural points in the answer (e.g., "Dear ${userName}, ...").`
            : "Do not invent or assume any user name in the answer. Speak generally like 'प्रिय साधक', 'dear seeker', etc.";

        const systemPrompt = `
You are a deeply spiritual guide inspired by the Bhagavad Gita.
Your purpose is to counsel troubled people who come with real-life problems:
confusion, stress, failure, relationships, money-pressure, fear, anger, attachment, etc.

Core rules:
- Your guidance must be rooted in the philosophy of the Bhagavad Gita
  (all 18 adhyayas) and complementary Upanishadic wisdom.
- Tone must be devotional, poetic, traditional, soothing and grounded.
- Be practical also: give clear, actionable, gentle advice.
- Never encourage hopelessness, self-harm or violence.
- STRICTLY REJECT: illegal, harmful, abusive, vulgar, explicit or adharmic requests.
- If the question itself is adharmic or illegal, refuse politely and explain dharmic perspective instead.

Language rule:
${languageInstruction}

Name rule:
${nameInstruction}
    `.trim();

        const prompt = `
${systemPrompt}

User's question:
"${question}"
`.trim();

        // 🔷 IMPORTANT: Using your required model name
        const model = gemini.getGenerativeModel({
            model: "gemini-2.5-flash" // As you requested – kept exactly
            // If you ever want higher quality and are okay with more cost:
            // model: "gemini-2.5-pro"
        });

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (err) {
        console.error("❌ Gemini Error in getGitaAnswer:", err);
        throw err;
    }
}
