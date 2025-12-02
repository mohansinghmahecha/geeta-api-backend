// import { openai } from "../config/openai.js";
// export async function getGitaAnswer(question) {
//     try {
//         const systemPrompt = `
//   You are a divine spiritual guide.
//   People ask questions from pain or confusion.
//   Answer ONLY using teachings from the Bhagavad Gita.
//   Use Hindi or Hinglish naturally.
//   Reject any illegal, abusive, vulgar or harmful question.
//   Tone must be devotional, calm, traditional and poetic.
//   `;
//         const completion = await openai.chat.completions.create({
//             model: "gpt-4.1-mini",
//             messages: [
//                 { role: "system", content: systemPrompt },
//                 { role: "user", content: question }
//             ]
//         });

//         return completion.choices[0].message.content;

//     } catch (err) {
//         console.error("❌ ERROR IN OPENAI:", err.response?.data || err.message || err);
//         throw err;
//     }
// }

import { gemini } from "../config/gemini.js";
export async function getGitaAnswer(question) {
    try {
        const systemPrompt = `
    You are a spiritual guide inspired by the Bhagavad Gita.
    Answer in Hindi, Hinglish, or English.
    Guidance must be rooted in the philosophy of the Gita (including all 18 adhyayas) and complementary Upanishadic wisdom.
    Strictly reject illegal, harmful, abusive, or vulgar content.
    Your tone must be devotional, poetic, traditional, and soothing.
    `;
        // ➡️ CHANGE THIS LINE: Update model name to gemini-2.5-flash or gemini-2.5-pro
        const model = gemini.getGenerativeModel({
            model: "gemini-2.5-flash" // Recommended as a versatile and efficient model
            // OR model: "gemini-2.5-pro" // Use this for the highest quality results
        });
        const prompt = `${systemPrompt}
User: ${question}`;
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (err) {
        console.error("❌ Gemini Error:", err);
        throw err;
    }
}