const Joi = require("joi");
const User = require("../service/schemas/authSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();

const RegExp = /^[a-zA-Z0-9]{3,30}$/;

const registrationValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(RegExp),
});

async function registrationCheck(req, res, next) {
  const { email, password } = req.body;
  const { error } = registrationValidate.validate({ email, password });
  const existingContact = await User.findOne({
    $or: [{ email: email }],
  });
  if (error) {
    res.status(400).json(error.message);
    return;
  }

  if (existingContact) {
    return res.status(409).json({
      message: "Email in use",
    });
  }
  next();
}

async function loginCheck(req, res, next) {
  const { email, password } = req.body;
  const { error } = registrationValidate.validate({ email, password });
  if (error) {
    return res.status(400).json(error.message);
  }

  const existingContact = await User.findOne({ email });
  if (!existingContact) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }
  const result = await bcrypt.compare(password, existingContact.password);
  if (result) {
    return next();
  }
  res.status(401).json({ message: "Email or password is wrong" });
}

module.exports = { registrationCheck, loginCheck };
