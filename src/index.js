import { initMongoConnection } from "./db/initMongoConnection.js";
import { setupServer } from "./server.js";
import { Contact } from "./db/models/contact.js"
import { TEMP_UPLOAD_DIR } from "./constants/index.js";
import { createFolderIfDoesNotExist } from "./utils/createFolderIfDoesNotExist.js";

(async () => {
  await initMongoConnection();
  await createFolderIfDoesNotExist(TEMP_UPLOAD_DIR);
  // await createFolder(UPLOAD_DIR);
  const contacts = await Contact.find({});
  setupServer();
})();
