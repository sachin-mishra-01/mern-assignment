import express from "express";
import { uploadCsv, getTasks } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/upload", protect, uploadCsv);
router.get("/", protect, getTasks);

export default router;
