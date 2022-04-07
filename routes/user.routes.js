import cors from "cors";
import express from "express";
import  authMiddleware  from "../middleware/auth.middleware.js";
import { login, signupUser, updateUser } from "../controllers/user.controller.js";
const router = express.Router();
router.use(cors());
router.post("/signup", authMiddleware, signupUser);
router.post("/login", login);
router.put("/update/:id", authMiddleware, updateUser);

export default router;
