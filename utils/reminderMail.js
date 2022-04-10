const cron = require("node-cron");
const { Reminder } = require("../models/");
const { Op } = require("sequelize");
const { sendEmail } = require("../utils/sendMail");
const dayjs = require("dayjs");
const cron_intervals = {
  daily: "0 0 * * *",
  weekly: "0 0 * * 0",
  every_minute: "* * * * *",
  sunday_morning: "0 0 * * 0",
  sunday_random_between_8_and_10: "0 0 8-10 * * 0",
  daily_random_between_8_and_10: "0 0 8-10 * * *",
  every_third_day: "0 0 * * */3",
};

const emailReminders = cron.schedule(
  // send email reminder every sunday at random time between 8am and 10am
  cron_intervals.sunday_random_between_8_and_10,
  // run every minute
  // cron_intervals.every_minute,
  async () => {
    // find users with visits this week
    console.log("running cron job");
    //  find reminders that are due today

    const reminders = await Reminder.findAll({
      where: {
        sendAt: {
          [Op.lte]: dayjs().format("YYYY-MM-DD"),
        },
      },
    });
    console.log(reminders);
    // send email to each user and delete reminder
    for (let reminder of reminders) {
      const { email, phoneNumber, subject, message } = reminder;
      sendEmail({
        email,
        subject,
        message,
      });
      await reminder.destroy();
    }
  },
  {
    scheduled: false,
  }
);
module.exports = emailReminders;
