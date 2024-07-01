import { createContact, deleteContact, getAllContacts, getContactById, upsertContact } from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { saveToCloudinary } from "../utils/saveToCloudinary.js";
import { ENV_VARS } from "../constants/index.js";
import { saveFile } from "../utils/saveFiles.js";
import { saveFileToLocal } from "../utils/saveFileToLocal.js";

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
  // console.log(req)
  const { body, file } = req;
  const userId = req.user._id;
  // console.log(body)
  if (!body.name) {
    throw createHttpError(400, 'name is required');
  }
  if (!body.phoneNumber) {
    throw createHttpError(400, 'phoneNumber is required');
  }
  const newContact = { ...body, photo: file, userId };
  const contact = await createContact(newContact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });

};

export const patchContactController = async (req, res) => {
  // console.log(req.body)
  // console.log(res)
  const body = req.body;
  const userId = req.user._id;
  const ID = req.params.contactId;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env(ENV_VARS.IS_CLOUDINARY_ENABLED) === "true") {
      photoUrl = await saveToCloudinary(photo)
    } else {
      photoUrl = await saveFileToLocal(photo)
    }

  }

  const contact = await upsertContact({ _id: ID, userId }, { ...body, photo });

  if (!contact) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
    });
  };

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