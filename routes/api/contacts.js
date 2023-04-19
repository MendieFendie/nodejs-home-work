const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsController");
const {
  validateGetById,
  validatePost,
  validateUpdate,
  validateDelete,
  validateFavorite,
} = require("../../validators/validateData");

router.get("/", listContacts);

router.get("/:contactId", validateGetById, getContactById);

router.post("/", validatePost, addContact);

router.delete("/:contactId", validateDelete, removeContact);

router.put("/:contactId", validateUpdate, updateContact);

router.patch("/:contactId/favorite", validateFavorite, updateStatusContact);

module.exports = router;
