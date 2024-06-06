import { createContact, deleteContact, getAllContacts, getContactById, upsertContact } from "../services/contacts.js";
import createHttpError from "http-errors";

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export const getContactByIdController = async (req, res, next) => {

  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  })
}

export const createContactController = async (req, res, next) => {

  const { body } = req;
  if(!body.name){
    throw createHttpError(400, 'name is required');
  }
  if(!body.phoneNumber){
    throw createHttpError(400, 'phoneNumber is required');
  }
  const contact = await createContact(body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });

};

export const patchContactController = async (req, res, next) => {

  const { body } = req;
  const { contactId } = req.params;
  const contact = await upsertContact(contactId, body);

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact',
    data: contact,
  });

};

export const deleteContactByIdController = async (req, res, next) => {

  const contactId = req.params.contactId;
  await deleteContact(contactId);

  res.status(204).send();
};