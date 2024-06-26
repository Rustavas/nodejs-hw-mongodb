import { createContact, deleteContact, getAllContacts, getContactById, upsertContact } from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";


export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = req.query;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export const getContactByIdController = async (req, res) => {

  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  })
}

export const createContactController = async (req, res) => {
  const body = req.body
  const userId = req.user._id;

  if (!body.name) {
    throw createHttpError(400, 'name is required');
  }
  if (!body.phoneNumber) {
    throw createHttpError(400, 'phoneNumber is required');
  }

  const newContact = { ...body, userId };
  const contact = await createContact(newContact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });

};

export const patchContactController = async (req, res) => {

  // const { body } = req;
  // const { contactId } = req.params;
  // const userId  = req.user._id;
  // const contact = await upsertContact(contactId, body, userId);

  // const contactId = req.params.contactId;
  // const body = req.body;
  // const contact = await updateContact(contactId, body, req.user._id);

  const body = req.body;
  const userId = req.user._id;
  const contactId = req.params.contactId;

  const contact = await upsertContact(contactId, body, userId);

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact',
    data: contact,
  });

};

export const deleteContactByIdController = async (req, res) => {

  const contactId = req.params.contactId;
  await deleteContact(contactId);

  res.status(204).send();
};