const fs = require("fs").promises;
const path = require("path");
const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const data = contacts.find((contact) => contact.id === contactId);
  if (!data) {
    return null;
  }
  return data;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((el) => el.id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  const [removeResult] = contacts.splice(contactIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeResult;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: ObjectID(),
    name,
    email,
    phone,
  };
  await fs.writeFile(
    contactsPath,
    JSON.stringify([newContact, ...contacts], null, 2)
  );

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
