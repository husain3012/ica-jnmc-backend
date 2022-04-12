require("dotenv").config();
const nodemailer = require("../utils/sendMail");
test("Send Mail", () => {
  expect(nodemailer).toBeTruthy();
  expect(nodemailer.sendEmail).toBeTruthy();
  expect(nodemailer.transporter).toBeTruthy();
  expect(process.env.GMAIL_USER).toBeTruthy();
  expect(process.env.GMAIL_PASSWORD).toBeTruthy();
});
