import { Router } from "express";
import { askGita } from "../controllers/gitaController.js";

const router = Router();

router.post("/ask", askGita);

export default router;
