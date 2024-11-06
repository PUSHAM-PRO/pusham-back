import Joi from "joi";

export const addTicketValidator = Joi.object({
  // user: Joi.string().required(),
  date: Joi.string().required(),
  department: Joi.string().required(),
  location: Joi.string().required(),
  problem: Joi.string().required(),
  description: Joi.string().required(),
  photo: Joi.string(),
  status: Joi.string().valid('initialized', 'in_progress', 'completed'),
});

export const updateTicketValidator = Joi.object({
  // user: Joi.string().required(),
  date: Joi.date(),
  department: Joi.string(),
  location: Joi.string(),
  problem: Joi.string().required(),
  description: Joi.string().required(),
  photo: Joi.string(),
  status: Joi.string(),
});
