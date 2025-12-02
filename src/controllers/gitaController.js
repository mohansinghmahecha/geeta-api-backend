import { getGitaAnswer } from "../services/gitaService.js";
import { isAllowed } from "../utils/validator.js";

export async function askGita(req, res) {
  const { question, language, userName } = req.body;

  // Basic validation
  if (!question || typeof question !== "string" || question.trim().length < 3) {
    return res.status(400).json({
      message: "कृपया अपना प्रश्न स्पष्ट रूप से लिखें ।"
    });
  }

  // Dharmic filter
  if (!isAllowed(question)) {
    return res.status(400).json({
      message: "यह प्रश्न धर्ममार्ग के अनुकूल नहीं है । कृपया केवल आध्यात्मिक और सदाचार से जुड़े प्रश्न पूछें ।"
    });
  }

  try {
    const answer = await getGitaAnswer(question.trim(), language, userName);
    return res.json({ answer });
  } catch (err) {
    console.error("❌ CONTROLLER ERROR (askGita):", err);
    return res.status(500).json({
      message: "कुछ व्यवधान हुआ, पुनः प्रयास करें."
    });
  }
}
