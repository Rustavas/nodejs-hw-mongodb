import { Router } from "express";
import { createContactController, deleteContactByIdController, getContactByIdController, getContactsController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createPatchContactSchema, createPostContactSchema } from "../validation/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";

const contactsRouter = Router();

contactsRouter.use('/', authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post('/', validateBody(createPostContactSchema), ctrlWrapper(createContactController));

contactsRouter.patch('/:contactId', validateBody(createPatchContactSchema), ctrlWrapper(patchContactController));

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactByIdController));



export default contactsRouter;