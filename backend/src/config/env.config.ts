import * as Joi from 'joi';

export enum Env {
  PORT = 'PORT',
  NODE_ENV = 'NODE_ENV',
  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRATION_TIME = 'JWT_EXPIRATION_TIME',

  API_PREFIX = 'API_PREFIX',

  DATABASE_HOST = 'DATABASE_HOST',
  DATABASE_PORT = 'DATABASE_PORT',
  DATABASE_USER = 'DATABASE_USER',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',
  DATABASE_NAME = 'DATABASE_NAME',
  DATABASE_MIGRATIONS_TABLE_NAME = 'DATABASE_MIGRATIONS_TABLE_NAME',
}

export const validationSchema = Joi.object({
  [Env.PORT]: Joi.number().default(3000),
  [Env.NODE_ENV]: Joi.string().valid('development', 'staging', 'production'),
  [Env.JWT_SECRET]: Joi.string().required(),
  [Env.JWT_EXPIRATION_TIME]: Joi.string().default('15m'),

  [Env.DATABASE_HOST]: Joi.string().required(),
  [Env.DATABASE_PORT]: Joi.number().required(),
  [Env.DATABASE_USER]: Joi.string().required(),
  [Env.DATABASE_PASSWORD]: Joi.string().required(),
  [Env.DATABASE_NAME]: Joi.string().required(),
  [Env.DATABASE_MIGRATIONS_TABLE_NAME]: Joi.string().required(),
  [Env.API_PREFIX]: Joi.string().default('api'),
});
