import Joi from "joi"
import JoiMongoId from "joi-objectid"

Joi.objectId = JoiMongoId(Joi)

export const createGenreValidator = Joi.object({

  title: Joi.string().required(),
  "category": Joi.string().required(),
  "releaseDate": Joi.string().required(),
  "dateOut": Joi.string().required(),
  producer: Joi.string().required(),
  customer: Joi.objectId().required(),
  customerId: Joi.objectId(),
  
  
}).strict()

export const updateGenreValidator = Joi.object({
  customer: Joi.objectId().required(),
  customerId: Joi.objectId().required(),
  title: Joi.string().optional(),
  producer: Joi.string().optional(),
  dateOut: Joi.string().optional(),
  dateReturned: Joi.string().optional(),
}).strict()