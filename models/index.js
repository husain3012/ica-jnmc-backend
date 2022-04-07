import User from "./user.model.js";
import Form from "./form.model.js";
// associate the User model with the Form model
Form.belongsTo(User);

export { User, Form };
