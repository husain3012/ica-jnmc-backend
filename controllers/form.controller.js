const { Form, User, Reminder } = require("../models/index.js");
const { Op } = require("sequelize");
const dayjs = require("dayjs");
const { sendEmail } = require("../utils/sendMail");

const createForm = async (req, res) => {
  const { reportingTime, name } = req.body;
  // next visit date
  const firstVisit = dayjs(reportingTime).add(1.5, "month").format("YYYY-MM-DD");
  const secondVisit = dayjs(reportingTime).add(3, "month").format("YYYY-MM-DD");
  const thirdVisit = dayjs(reportingTime).add(6, "month").format("YYYY-MM-DD");
  const newForm = await Form.create({
    form: req.body,
    firstVisit,
    secondVisit,
    thirdVisit,
  });
  const findUser = await User.findOne({
    where: {
      id: req.user.id,
    },
  });
  await newForm.setUser(findUser);
  // get email colums of admins

  const admins = await User.findAll({
    attributes: ["email"],
    where: {
      level: 0,
    },
  });
  const adminEmails = admins.map((admin) => admin.email);
  sendEmail({
    email: adminEmails,
    subject: `New Needle Stick Injury form by ${name}`,
    html: `
      <h1>New Needle Stick Injury form by ${name}</h1>
      <p>${name} (${req.user.email}) has submitted a new Needle Stick Injury form. Please login to the application to view the form.</p>
      `,
  });

  return res.status(201).json({
    message: "Form created",
    newForm,
  });
};
const updateForm = async (req, res) => {
  const { id } = req.params;
  const form = await Form.findOne({ where: { id } });
  if (!form) {
    return res.status(404).send({
      message: "Form not found",
    });
  }
  form.update({
    form: req.body,
  });
  form.save();
  return res.status(200).json({
    message: "Form updated",
    form,
  });
};

const deleteForm = async (req, res) => {
  const { id } = req.params;
  const form = await Form.findOne({ where: { id } });
  if (!form) {
    return res.status(404).send({
      message: "Form not found",
    });
  }
  form.destroy();
  return res.status(200).json({
    message: "Form deleted",
  });
};
const getForm = async (req, res) => {
  const { id } = req.params;
  const form = await Form.findOne({ where: { id } });

  if (!form) {
    return res.status(404).send({
      message: "Form not found",
    });
  }
  return res.status(200).json(form);
};
const getAllForms = async (req, res) => {
  const { currentPage, pageSize } = req.query;
  const searchQuery = {
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["id", "email", "user_id", "level"],
      },
    ],
  };
  if (pageSize) {
    searchQuery.limit = pageSize;
  }
  if (currentPage && pageSize) {
    searchQuery.offset = (currentPage - 1) * pageSize;
  }

  const forms = await Form.findAll(searchQuery);
  return res.status(200).json(forms);
};

const addReminder = async (req, res) => {
  const { id } = req.params;
  const { email, phoneNumber } = req.body;
  const form = await Form.findOne({ where: { id } });
  if (!form) {
    return res.status(404).send({
      message: "Form not found",
    });
  }
  if (!email || email === "") {
    return res.status(400).send({
      message: "Email is required",
    });
  }
  const firstVisit = await Reminder.create({
    email,
    phoneNumber,
    sendAt:   new Date(),
    subject: "Needle Stick Injury, First Visit",
    message: `Hi, ${form.form.name}! This is a reminder to attend your first visit, on ${dayjs(form.firstVisit).format("ddd, DD-MMM-YYYY")}.`,
  });
  const secondVisit = await Reminder.create({
    email,
    phoneNumber,
    sendAt: form.secondVisit,
    subject: "Needle Stick Injury, Second Visit",
    message: `Hi, ${form.form.name}! This is a reminder to attend your second visit, on ${dayjs(form.secondVisit).format("ddd, DD-MMM-YYYY")}.`,
  });

  const thirdVisit = await Reminder.create({
    email,
    phoneNumber,
    sendAt: form.thirdVisit,
    subject: "Needle Stick Injury, Third Visit",
    message: `Hi, ${form.form.name}! This is a reminder to attend your third visit, on ${dayjs(form.thirdVisit).format("ddd, DD-MMM-YYYY")}`,
  });
  return res.status(200).json({
    message: "Reminders created",
    firstVisit,
    secondVisit,
    thirdVisit,
  });
};

module.exports = {
  createForm,
  updateForm,
  deleteForm,
  getForm,
  getAllForms,
  addReminder,
};
