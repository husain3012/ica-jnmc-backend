require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/user.routes");
const formRoutes = require("./routes/form.routes");
const settingsRoutes = require("./routes/settings.routes");
const db = require("./utils/database");
const cors = require("cors");
const { User, Settings } = require("./models");
const { emailReminders } = require("./utils/reminderMail");

db.sync({
  force: process.env.DROP_DATABASE === `DROP DATABASE ${db.config.database}`,
})
  .then(async () => {
    await User.findOne({ where: { email: process.env.ADMIN_EMAIL } }).then(async (user) => {
      if (!user) {
        const defaultUser = await User.create({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          user_id: process.env.ADMIN_USER_ID,
          level: 0,
        });
        console.log("Default Admin created", defaultUser);
      }
    });
    // create guest login user
    await User.findOne({ where: { user_id: "guest" } }).then(async (user) => {
      if (!user) {
        const defaultUser = await User.create({
          email: process.env.GUEST_EMAIL,
          password: process.env.GUEST_PASSWORD,
          user_id: "guest",
          level: 4,
        });
        console.log("Guest user created", defaultUser);
      }
    });
    // create default settings
    await Settings.findOne({ where: { createdBy: process.env.ADMIN_EMAIL } }).then(async (settings) => {
      if (!settings) {
        const defaultSettings = await Settings.create({
          emailReminders: true,
          whatsappReminders: true,
          cronInterval: "daily",
          serverCrons: true,
          createdBy: process.env.ADMIN_EMAIL,
        });
        console.log("Default settings created", defaultSettings);
      }
    });
  })
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// add mock delay to simulate slow network
// app.use((req, res, next) => {
//   setTimeout(next, 1000);
// });

app.get("/", (req, res) => {
  return res.json({
    message: "Hello World",
  });
});

app.use("/api/user", userRoutes);
app.use("/api/form", formRoutes);
app.use("/api/settings", settingsRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});

if (process.env.EMAIL_REMINDERS === "true") {
  console.log("Server crons enabled");
  emailReminders.start();
}

module.exports = app;
