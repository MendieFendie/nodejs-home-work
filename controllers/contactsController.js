const {
  getAll,
  getById,
  add,
  update,
  remove,
} = require("../service/contactsService");

const listContacts = async (req, res) => {
  try {
    const data = await getAll();
    res.send(data);
  } catch (error) {
    return console.log(error);
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const data = await getById(contactId);
  res.send(data);
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = {
    name: name,
    email: email,
    phone: phone,
  };
  const data = await add(contact);
  res.status(201).json(data);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  await remove(contactId);
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const contactToEdit = await getById(contactId);

  const updatedContact = {
    name: body.name || contactToEdit.name,
    email: body.email || contactToEdit.email,
    phone: body.phone || contactToEdit.phone,
  };

  const result = await update(contactId, updatedContact);

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
