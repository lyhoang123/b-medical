const Joi = require('joi');
const { validateSchema } = require('../utils');

const envSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
  PASSPORT_SECRET_OR_KEY: Joi.string().min(1).required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
  RPC_URL: Joi.string().required(),
  RPC_WSS_URL: Joi.string().required(),
  RPC_CHAIN_ID: Joi.number().required(),
  LAUNCHPAD_ADDRESS: Joi.string().required(),
  LAUNCHPAD_DEPLOYED_BLOCK: Joi.number().required(),
}).unknown();

const {
  isValid,
  value: envVars,
  errors,
} = validateSchema(process.env, envSchema);

if (!isValid) {
  console.log(errors); // eslint-disable-line no-console
  throw new Error('ENV_CONFIG_ERROR');
}

module.exports = {
  MONGO_URI: envVars.MONGO_URI,
  PASSPORT_SECRET_OR_KEY: envVars.PASSPORT_SECRET_OR_KEY,
  REDIS_HOST: envVars.REDIS_HOST,
  REDIS_PORT: envVars.REDIS_PORT,
  REDIS_PASSWORD: envVars.REDIS_PASSWORD,
  RPC_URL: envVars.RPC_URL,
  RPC_WSS_URL: envVars.RPC_WSS_URL,
  RPC_CHAIN_ID: envVars.RPC_CHAIN_ID,
  LAUNCHPAD_ADDRESS: envVars.LAUNCHPAD_ADDRESS,
  LAUNCHPAD_DEPLOYED_BLOCK: envVars.LAUNCHPAD_DEPLOYED_BLOCK,
};
