const Contact = require("./schemas/contact");

const getAll = (userId) => {
  return Contact.find({ owner: userId });
};

const getById = (id, userId) => {
  return Contact.find({ owner: userId, _id: id });
};

const add = ({ name, phone, email }, owner) => {
  return Contact.create({ name, phone, email, owner });
};

const update = (id, fields) => {
  return Contact.findOneAndUpdate({ _id: id }, fields, { new: true });
};

const remove = (id, userId) => {
  return Contact.findByIdAndRemove({ _id: id, owner: userId });
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
