const User = require("./user.model.js");
const Form = require("./form.model.js");
const Reminder = require("./reminder.model.js");
const Settings = require("./settings.model.js");
// associate the User model with the Form model
Form.belongsTo(User);
// associate the Form model with the Reminder model
Form.hasMany(Reminder);


module.exports = { User, Form, Reminder, Settings };
