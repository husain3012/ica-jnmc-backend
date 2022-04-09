require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/user.routes");
const formRoutes = require("./routes/form.routes");
const db = require("./utils/database");
const cors = require("cors");
const { User } = require("./models");

const preventSLeep = require("./utils/preventSleep");

console.log(process.env.NODE_ENV);
db.sync()
  .then(() => {
    User.findOne({ where: { email: process.env.ADMIN_EMAIL } }).then(async (user) => {
      if (!user) {
        const defaultUser = await User.create({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          user_id: process.env.ADMIN_USER_ID,
          level: 0,
        });
        console.log("Default user created", defaultUser);
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


app.get("/", (req, res) => {
  return res.json({
    message: "Hello World",
  });
});

app.use("/api/user", userRoutes);
app.use("/api/form", formRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});

// prevent sleep
preventSLeep();