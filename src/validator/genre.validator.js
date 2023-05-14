import Joi from "joi"
import JoiMongoId from "joi-objectid"

Joi.objectId = JoiMongoId(Joi)

export const createGenreValidator = Joi.object({

  title: Joi.string().required(),
  producer: Joi.string().required(),
  customer: Joi.objectId().required(),
  customerId: Joi.objectId(),
  
}).strict()


export const updateGenreValidator = Joi.object({
  customer: Joi.objectId().required(),
  customerId: Joi.objectId().required(),
  title: Joi.string().required(),
  producer: Joi.string().required(),
  dateReturned: Joi.string().required()
}).strict()
