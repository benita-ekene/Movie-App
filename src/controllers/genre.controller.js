import {createGenreValidator} from "../validator/genre.validator.js"
import Genre from "../model/genre.model.js"
import User from "../model/user.model.js"
import { BadUserRequestError } from "../error/error.js"

export default class GenreController {
  static async createGenre(req, res,){
      const {error } = createGenreValidator.validate(req.body)
      if(error) throw error

      const isUserAvailable = await User.findById(req.body.creator)
      if(!isUserAvailable) throw new BadUserRequestError(`User with this id: ${req.body.creator} does not exist`)

      const newGenre = await Genre.create(req.body)
      res.status(200).json({
      message: "Genre created successfully",
      status: "Success",
      data:{
        genre: newGenre
      }
    })
  }
}