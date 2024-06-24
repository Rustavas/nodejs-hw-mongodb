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
  filter = {},
  userId,
}) => {
  const skip = perPage * (page - 1);

  const contactsQuery = Contact.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavorite) {
    contactsQuery.where('isFavorite').equals(filter.isFavorite);
  }

  const [contactsCount, contacts] = await Promise.all(
    [Contact.find({ userId }).countDocuments(),
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
    contactsCount
  )

  return {
    contacts,
    ...paginationInformation,
  };
}

export const getContactById = async (id, userId) => {
  return await Contact.findById({ _id: id, userId });
};

export const createContact = async (payload, userId) => {
  const contact = await Contact.create(...payload, userId);

  return contact;
};

export const upsertContact = async (id, payload, userId) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: id, userId },
    payload,
    { new: true },
  );

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  };

  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  };

  return contact;
};