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

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);

  return contact;
};

export const upsertContact = async (contactId, payload) => {
  const contact = await Contact.findByIdAndUpdate(contactId, payload, { new: true });

  return contact;
}

export const deleteContact = async (contactId) => {
  await Contact.findByIdAndDelete(contactId);
}