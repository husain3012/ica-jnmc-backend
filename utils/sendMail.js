const nodeMailer = require("nodemailer");
// nodemailer config gmail
const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// function to send email
const sendEmail = async (email, subject, message) => {
  const msg = {
    to: email,
    from: process.env.GMAIL_USER,
    subject: subject,
    text: message,
  };
  try {
    const resp = await transporter.sendMail(msg);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  sendEmail,
};
