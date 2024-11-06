import Joi from "joi";

export const addTicketValidador = Joi.object({
    
    department:Joi.string(). required(),
    location:Joi.string().required(),
    problem:Joi.string().required(),
    description:Joi.string().required(),
    photo:Joi.string(),
    status:Joi.string()

})

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
