const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");
const { createForm, deleteForm, getAllForms, getForm, updateForm } = require("../controllers/form.controller.js");

router.post("/create", authMiddleware, createForm);
router.delete("/delete/:id", authMiddleware, deleteForm);
router.get("/getAll", getAllForms);
router.get("/get/:id", getForm);
router.put("/update/:id", authMiddleware, updateForm);

module.exports = router;