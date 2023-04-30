const {
  getAll,
  getById,
  add,
  update,
  remove,
} = require("../service/contactsService");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  try {
    const data = await getAll({ _id });
    res.send(data);
  } catch (error) {
    return console.log(error);
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const data = await getById(contactId, _id);
  res.send(data);
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const { _id } = req.user;
  const contact = {
    name: name,
    email: email,
    phone: phone,
  };
  const data = await add(contact, _id);
  res.status(201).json(data);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  await remove(contactId, _id);
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const { _id } = req.user;

  const contactToEdit = await getById(contactId, _id);

  const updatedContact = {
    name: body.name || contactToEdit.name,
    email: body.email || contactToEdit.email,
    phone: body.phone || contactToEdit.phone,
  };

  const result = await update(contactToEdit, updatedContact);

  res.send(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const data = {
    favorite: favorite,
  };
  const result = await update(contactId, data);
  res.status(200).json(result);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
