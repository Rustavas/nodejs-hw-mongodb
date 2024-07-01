import path from "node:path";
import fs from 'node:fs/promises';
import { ENV_VARS, UPLOAD_DIR } from '../constants/index.js';
import { env } from './env.js';

export const saveFileToLocal = async (file) => {
const content = await FileSystem.readFile(file.path);
const newPath = path.join(UPLOAD_DIR, file.filename);
await fs.writeFile(newPath, content);
await fs.unlink(file.path);

return env(ENV_VARS.BACKEND_HOST) + `/uploads/${file.filename}`;
} 