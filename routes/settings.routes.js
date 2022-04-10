const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");
const { sendReminders, enableEmailReminders, disableEmailReminders } = require("../controllers/settings.controller");

router.post("/sendReminders", authMiddleware, sendReminders);
router.post("/enableEmails", authMiddleware, enableEmailReminders);
router.post("/disableEmails", authMiddleware, disableEmailReminders);

module.exports = router;
