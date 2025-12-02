import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import gitaRoutes from "./routes/gitaRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
console.log("🔑 Gemini Key:", process.env.GEMINI_API_KEY ? "YES" : "NO");
app.use("/gita", gitaRoutes);
app.listen(5000, () => {
  console.log("Gita AI (Gemini Version) running on port 5000...");
});

// http://localhost:5000/gita/ask
// {
//   "question": "Mere name kya hian ?",
//   "language": "english",
//   "userName": "Monu"
// }
