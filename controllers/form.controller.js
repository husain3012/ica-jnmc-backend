const { Form, User } = require("../models/index.js");
const { Op } = require("sequelize");
const dayjs = require("dayjs");
const {sendEmail} =require("../utils/sendMail")

const createForm = async (req, res) => {
  const { reportingTime } = req.body;
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
  sendEmail('husainshahidrao@gmail.com', 'New Form', 'New Form has been created')

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
  console.log(form);
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

module.exports = {
  createForm,
  updateForm,
  deleteForm,
  getForm,
  getAllForms,
};
