import express from "express";
import { loginAdmin,signupAdmin } from "../controllers/authController.js";
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/signup", signupAdmin);
export default router;
