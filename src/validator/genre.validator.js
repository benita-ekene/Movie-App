import Joi from "joi"
import JoiMongoId from "joi-objectid"

Joi.objectId = JoiMongoId(Joi)

export const createGenreValidator = Joi.object({

  title: Joi.string().required(),
  producer: Joi.objectId().required(),
  producerId: Joi.objectId(),
  
  
}).strict()
