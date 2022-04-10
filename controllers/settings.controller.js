const { findAndSendReminders } = require("../utils/reminderMail");
const { Settings } = require("../models");
const { sendEmail } = require("../utils/sendMail");

const sendReminders = async (req, res) => {
  sendEmail({
    email: "husainshahidrao@gmail.com",
    subject: "Cron job",
    message: "Cron job",
  });

  const user = req.user;
  if (user.level !== 0) {
    res.status(401).send({ message: "Unauthorized" });
  }
  return await findAndSendReminders();
};

const enableEmailReminders = async (req, res) => {
  const user = req.user;
  if (user.level !== 0) {
    res.status(401).send({ message: "Unauthorized" });
  }
  const settings = await Settings.findOne({ where: { createdBy: process.env.ADMIN_EMAIL } });
  settings.update({
    emailReminders: true,
  });
  return res.status(200).json({
    message: "Email reminders enabled",
    settings,
  });
};

const disableEmailReminders = async (req, res) => {
  const user = req.user;
  if (user.level !== 0) {
    res.status(401).send({ message: "Unauthorized" });
  }
  const settings = await Settings.findOne({ where: { createdBy: process.env.ADMIN_EMAIL } });
  settings.update({
    emailReminders: false,
  });
  return res.status(200).json({
    message: "Email reminders disabled",
    settings,
  });
};

module.exports = {
  sendReminders,
  enableEmailReminders,
  disableEmailReminders,
};
