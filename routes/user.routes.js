import express from "express";
import  authMiddleware  from "../middleware/auth.middleware.js";
import { login, signupUser, updateUser } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/signup", authMiddleware, signupUser);
router.post("/login", login);
router.put("/update/:id", authMiddleware, updateUser);

export default router;
