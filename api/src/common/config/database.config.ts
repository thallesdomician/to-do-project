import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const databaseConfig = () =>
  registerAs('database', () => {
    const values = {
      uri: process.env.MONGO_URI,
      name: process.env.MONGO_DATABASE_NAME,
    };
    const schema = Joi.object({
      uri: Joi.string().required(),
      name: Joi.string().required(),
    }).required();
    const { error } = schema.validate(values, {
      abortEarly: false,
    });
    if (error) {
      throw new Error(error.message);
    }
    return values;
  });
