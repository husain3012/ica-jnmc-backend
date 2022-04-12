const nodemailer = require("../utils/sendMail");
test("Send Mail", () => {
  expect(nodemailer).toBeTruthy();
  expect(nodemailer.sendEmail).toBeTruthy();
  expect(nodemailer.transporter).toBeTruthy();
});
