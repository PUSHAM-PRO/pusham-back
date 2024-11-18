import Joi from "joi";

export const userSignUpValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    nationality: Joi.string(),
    password: Joi.string().required(),
    department: Joi.string(),
    location: Joi.string(),
    phoneNumber: Joi.number(),
    role: Joi.string()
});

export const userLoginValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});

export const userUpdateValidator = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    nationality: Joi.string(),
    password: Joi.string(),
    location: Joi.string(),
    phoneNumber: Joi.number(),
    fcmToken: Joi.string(),
    role: Joi.string(),
    role: Joi.string(),
    category: Joi.string().valid(
      'technical support',
      'billing',
      'account management',
      'sales enquiry'
  ),
});
