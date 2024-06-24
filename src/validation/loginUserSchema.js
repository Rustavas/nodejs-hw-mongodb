
import Joi from 'joi';

export const loginUserSchema = Joi.object(
  {
    password: Joi.string().required().min(3).max(20),
    email: Joi.string().required().email(),
  },
);





