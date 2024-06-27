
import Joi from 'joi';

export const resetPwdSchema = Joi.object(
  {
    password: Joi.string().required().min(3).max(20),
    token: Joi.string().required(),
  },
);


