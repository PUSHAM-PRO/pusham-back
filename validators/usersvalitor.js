import Joi from "joi";

export const userSignUpValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    nationality: Joi.string().required(),
    password: Joi.string().required()
});

export const userLoginValidator = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

export const userUpdateValidator = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phoneNumber: Joi.string()
   
});
