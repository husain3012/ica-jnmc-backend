const User = require("./user.model.js");
const Form = require("./form.model.js");
// associate the User model with the Form model
Form.belongsTo(User);

module.exports = { User, Form };
