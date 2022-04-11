const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");
const { login, signupUser, updateUser, getAllUsers } = require("../controllers/user.controller.js");

router.get("/all", authMiddleware, getAllUsers);
router.post("/signup", authMiddleware, signupUser);
router.post("/login", login);
router.put("/update/:id", authMiddleware, updateUser);

module.exports = router;
