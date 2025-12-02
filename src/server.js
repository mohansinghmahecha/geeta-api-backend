// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import gitaRoutes from "./routes/gitaRoutes.js";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use("/gita", gitaRoutes);

// app.listen(5000, () => {
//   console.log("Gita AI server running on port 5000...");
// });


import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import gitaRoutes from "./routes/gitaRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// ❌ OLD
// console.log("🔑 OpenAI Key:", process.env.OPENAI_API_KEY ? "YES" : "NO");

// ✅ NEW
console.log("🔑 Gemini Key:", process.env.GEMINI_API_KEY ? "YES" : "NO");

app.use("/gita", gitaRoutes);

app.listen(5000, () => {
  console.log("Gita AI (Gemini Version) running on port 5000...");
});
