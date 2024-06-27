
import Joi from 'joi';

export const resetEmailSchema = Joi.object(
  {
    email: Joi.string().required().email(),
  },
);





