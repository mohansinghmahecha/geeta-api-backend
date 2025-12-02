import { getGitaAnswer } from "../services/gitaService.js";
import { isAllowed } from "../utils/validator.js";

export async function askGita(req, res) {
    const { question } = req.body;

    if (!isAllowed(question)) {
        return res.status(400).json({
            message: "यह प्रश्न धर्ममार्ग के अनुकूल नहीं है । कृपया आध्यात्मिक विषय पर ही पूछें ।"
        });
    }

    try {
        const answer = await getGitaAnswer(question);
        res.json({ answer });
    } catch (err) {
        console.error("❌ CONTROLLER ERROR:", err);
        res.status(500).json({ message: "कुछ व्यवधान हुआ, पुनः प्रयास करें." });
    }
}
