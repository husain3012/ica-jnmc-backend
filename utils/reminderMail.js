const cron = require("node-cron");
const { Form } = require("../models/");
const { Op } = require("sequelize");
const { sendEmail } = require("../utils/sendMail");
const dayjs = require("dayjs");
const emailReminders = cron.schedule(
  // send email reminder every sunday at random time between 8am and 10am
    "0 0-10 * * 0",
  async () => {
    // find users with visits this week
    console.log("running cron job");
    const firstVisits = await Form.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), new Date()],
        },
      },
    });
    const secondVisits = await Form.findAll({
      where: {
        secondVisit: {
          [Op.between]: [new Date(), new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)],
        },
      },
    });
    const thirdVisits = await Form.findAll({
      where: {
        thirdVisit: {
          [Op.between]: [new Date(), new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)],
        },
      },
    });
    // send email to users

    for (let i = 0; i < Math.min(firstVisits.length, 7); i++) {
      await sendEmail(firstVisits[i].form.email, "Needle Injury First Visit", `Your first visit is scheduled for ${dayjs(firstVisits[i].firstVisit).format("DD-MMM-YYYY, ddd")}`);
    }
    for (let i = 0; i < Math.min(secondVisits.length, 7); i++) {
      await sendEmail(secondVisits[i].form.email, "Needle Injury Second Visit", `Your second visit is scheduled for ${dayjs(secondVisits[i].secondVisit).format("DD-MMM-YYYY, ddd")}`);
    }
    for (let i = 0; i < Math.min(thirdVisits.length, 7); i++) {
      await sendEmail(thirdVisits[i].form.email, "Needle Injury Third Visit", `Your third visit is scheduled for ${dayjs(thirdVisits[i].thirdVisit).format("DD-MMM-YYYY, ddd")}`);
    }
  },
  {
    scheduled: false,
  }
);
module.exports = emailReminders;
