import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/auth.middleware.js";
import { createForm, deleteForm, getAllForms, getForm, updateForm } from "../controllers/form.controller.js";

router.post("/create", authMiddleware, createForm);
router.delete("/delete/:id", authMiddleware, deleteForm);
router.get("/getAll", getAllForms);
router.get("/get/:id", getForm);
router.put("/update/:id", authMiddleware, updateForm);
export default router;
