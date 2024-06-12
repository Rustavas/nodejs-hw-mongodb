import Joi from 'joi';


export const createPostContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(20),
  isFavorite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').default('personal').min(3).max(20),
},
);

export const createPatchContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(20),
  isFavorite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').default('personal').min(3).max(20),
},
);
