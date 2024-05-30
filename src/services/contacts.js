import { Contact } from "../db/models/contact.js"

export const getAllContacts = async () => {
  return await Contact.find();
}

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
   throw createHttpError(404, "Contact not found")
  };

  return contact;
}