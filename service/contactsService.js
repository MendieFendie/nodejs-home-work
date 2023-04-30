const Contact = require("./schemas/contact");

const getAll = () => {
  return Contact.find();
};

const getById = (id) => {
  return Contact.findOne({ _id: id });
};

const add = ({ name, phone, email }) => {
  return Contact.create({ name, phone, email });
};

const update = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const remove = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
