const Joi = require("joi");
const mongoose = require("mongoose");
const { getById } = require("../service/contactsService");

const Contact = require("../service/schemas/contact");

const contactValidatePost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const contactValidatePut = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

async function validateGetById(req, res, next) {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: "Not found" });
  }
  const contact = await getById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  next();
}

async function validatePost(req, res, next) {
  const body = req.body;
  const { error } = contactValidatePost.validate(body);
  let missingField;

  if (!body.name) {
    missingField = "name";
  } else if (!body.email) {
    missingField = "email";
  } else if (!body.phone) {
    missingField = "phone";
  }

  if (missingField) {
    return res.status(400).json({
      message: `Missing required ${missingField} field.`,
    });
  }

  const existingContact = await Contact.findOne({
    $or: [{ email: body.email }],
  });

  if (existingContact) {
    return res.status(409).json({
      message: "Contact with this email already exists.",
    });
  }
  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  next();
}

async function validateDelete(req, res, next) {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: "Not found" });
  }
  next();
}

async function validateUpdate(req, res, next) {
  const body = req.body;
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: "Not found" });
  }
  if (!body.name && !body.email) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  const { error } = contactValidatePut.validate(body);
  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  next();
}

async function validateFavorite(req, res, next) {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(404).json({ message: "Not found" });
  }
  if (!favorite) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  next();
}

module.exports = {
  validateGetById,
  validatePost,
  validateDelete,
  validateUpdate,
  validateFavorite,
};
