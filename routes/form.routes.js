const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");
const { createForm, deleteForm, getAllForms, getForm, updateForm,addReminder} = require("../controllers/form.controller.js");

router.post("/create", authMiddleware, createForm);
router.delete("/delete/:id", authMiddleware, deleteForm);
router.get("/getAll", authMiddleware,getAllForms);
router.get("/get/:id", authMiddleware,getForm);
router.put("/update/:id", authMiddleware, updateForm);
router.post("/reminder/:id", authMiddleware, addReminder);

module.exports = router;