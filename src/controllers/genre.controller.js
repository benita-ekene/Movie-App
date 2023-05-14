import {createGenreValidator, updateGenreValidator} from "../validator/genre.validator.js"
import Genre from "../model/genre.model.js"
import User from "../model/user.model.js"
import { BadUserRequestError } from "../error/error.js"
import { mongoIdValidator } from "../validator/mongoId.validator.js"

export default class GenreController {
  static async createGenre(req, res,){
      const {error } = createGenreValidator.validate(req.body)
      if(error) throw error

      const isUserAvailable = await User.findById(req.body.producer)
      if(!isUserAvailable) throw new BadUserRequestError(`User with this id: ${req.body.producer} does not exist`)

      const newGenre = await Genre.create({...req.body, customer: req.user._id, customerId: req.user._id })
      res.status(201).json({
      message: "Genre has been created successfully",
      status: "Success",
      data:{
        task: newTask
      }
    })
  }
}