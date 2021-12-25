const Joi = require("joi");

const stringSchema = Joi.string().trim();
const passwordSchema = Joi.string().trim().alphanum();

const postSourceSchema = Joi.object({
  name: stringSchema.required(),
  url: stringSchema.required(),
  folder: stringSchema.required(),
  description: stringSchema.optional(),
});

const updateSourceSchema = Joi.object({
  name: stringSchema.optional(),
  url: stringSchema.optional(),
  description: stringSchema.optional(),
}).min(1);

const postFolderSchema = Joi.object({
  name: stringSchema.required(),
}).min(1);

const updateFolderSchema = Joi.object({
  name: stringSchema.required(),
}).min(1);

const loginSchema = Joi.object({
  login: stringSchema.required(),
  password: passwordSchema.required(),
}).min(1);

const validate = async (schema, object, res, next) => {
  try {
    await schema.validateAsync(object);
    next();
  } catch (error) {
    next(error);
  }
};

const validatePostedSource = async (req, res, next) => {
  return await validate(postSourceSchema, req.body, res, next);
};

const validateUpdatedSource = async (req, res, next) => {
  return await validate(updateSourceSchema, req.body, res, next);
};

const validatePostedFolder = async (req, res, next) => {
  return await validate(postFolderSchema, req.body, res, next);
};

const validateUpdatedFolder = async (req, res, next) => {
  return await validate(updateFolderSchema, req.body, res, next);
};

const validateLogin = async (req, res, next) => {
  return await validate(loginSchema, req.body, res, next);
};

module.exports = {
  validatePostedFolder,
  validateUpdatedFolder,
  validatePostedSource,
  validateUpdatedSource,
  validateLogin,
};
