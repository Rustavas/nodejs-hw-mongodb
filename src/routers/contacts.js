import { Router } from "express";
import { createContactController, deleteContactByIdController, getContactByIdController, getContactsController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));

contactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post('/contacts', ctrlWrapper(createContactController));

contactsRouter.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

contactsRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactByIdController));



export default contactsRouter;