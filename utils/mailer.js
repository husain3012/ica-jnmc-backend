import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (email, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: "yandex",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.HICC_HEAD,
    subject: "Email from Node-App: A Test Message!",
    text: "Some content to send",
  };
};
