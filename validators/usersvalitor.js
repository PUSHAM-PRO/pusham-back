import Joi from "joi";

export const userSignUpValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  nationality: Joi.string().required(),
  password: Joi.string().required(),
  location: Joi.string().required(),
  phoneNumber: Joi.string(),
});

export const userLoginValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const userUpdateValidator = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  nationality: Joi.string(),
  location: Joi.string(),
  phoneNumber: Joi.string(),
  fcmToken: Joi.string(),
});
