import { Router } from "express";
import { createContactController, deleteContactByIdController, getContactByIdController, getContactsController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createPatchContactSchema, createPostContactSchema } from "../validation/contacts.js";

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));

contactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post('/contacts', validateBody(createPostContactSchema), ctrlWrapper(createContactController));

contactsRouter.patch('/contacts/:contactId', validateBody(createPatchContactSchema), ctrlWrapper(patchContactController));

contactsRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactByIdController));



export default contactsRouter;