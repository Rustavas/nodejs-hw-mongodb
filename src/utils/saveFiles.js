import { ENV_VARS } from '../constants/index.js';
import { env } from './env.js';
import { saveToCloudinary } from './saveToCloudinary.js';
import { saveFileToLocal } from './saveFileToLocal.js';

export const saveFile = async (file) => {
  if (!file) return;

  let url;
  if (env(ENV_VARS.IS_CLOUDINARY_ENABLED) === 'true') {
    url = await saveToCloudinary(file);
  } else {
    url = await saveFileToLocal(file);
  }

  return url;
};