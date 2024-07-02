import { Contact } from "../db/models/contact.js"
import createHttpError from 'http-errors';
import { saveToCloudinary } from "../utils/saveToCloudinary.js";
import { saveFile } from "../utils/saveFiles.js";

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
    Contact.find({ userId })
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

export const createContact = async ({ photo, ...payload }) => {
  const url = await saveFile(photo);

  const newContact = await Contact.create({
    ...payload,
    photo: url,
  });

  return await newContact.save();
};



// 

// export const upsertContact = async (id, payload, userId) => {
//   const contact = await Contact.findByIdAndUpdate(
//     { _id: id, userId },
//     payload,
//     { new: true },
//   );

//   if (!contact) {
//     throw createHttpError(404, 'Contact not found');
//   };

//   return contact;
// };

// 

export const upsertContact = async (
  { _id: ID, userId },
  payload,
  options = {},
) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: ID, userId },
    payload,
    {
      new: true,
      ...options,
    },
  );
  return rawResult;
};

// 
export const deleteContact = async (contactId, userId) => {

  const contact = await Contact.findByIdAndDelete({ _id: contactId, userId });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  };

  return contact;
};