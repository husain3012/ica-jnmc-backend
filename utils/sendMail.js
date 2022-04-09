const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendScheduledEmail = async (email, subject, message) => {
  const today = new Date();
  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER_EMAIL,
    subject: subject,
    text: message,
  };
  try {
    const resp = await sgMail.send(msg);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = sendScheduledEmail;
