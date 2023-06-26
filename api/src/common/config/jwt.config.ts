import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const authConfig = () =>
  registerAs('auth', () => {
    const values = {
      secret: process.env.JWT_SECRET,
      expiration: process.env.JWT_EXPIRATION,
      refresh_token_expiration: process.env.JWT_REFRESH_EXPIRATION,
    };
    const schema = Joi.object({
      secret: Joi.string().required(),
      expiration: Joi.string().required(),
      refresh_token_expiration: Joi.string().required(),
    }).required();
    const { error } = schema.validate(values, {
      abortEarly: false,
    });
    if (error) {
      throw new Error(error.message);
    }
    return values;
  });
