import { Contact } from "../db/models/contact.js"
import createHttpError from 'http-errors';

const createPaginationInformation = (page, perPage, count) => {

  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;
  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  }
}

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const skip = perPage * (page - 1);

  const [contactsCount, contacts] = await Promise.all(
    [Contact.find().countDocuments(),
    Contact.find()
      .skip(skip)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder,

      })
      .exec(),
    ]
  )

  const paginationInformation = createPaginationInformation(
    page,
    perPage,
    contactsCount)

  return {
    contacts,
    ...paginationInformation,
  };
}

export const getContactById = async (contactId) => {

  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  };

  return contact;
}

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);

  return contact;
};

export const upsertContact = async (contactId, payload) => {

  const contact = await Contact.findByIdAndUpdate(contactId, payload, { new: true });
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
}

export const deleteContact = async (contactId) => {

  const contact = await Contact.findByIdAndDelete(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
}