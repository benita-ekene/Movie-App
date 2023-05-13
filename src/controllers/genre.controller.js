import {createGenreValidator} from "../validator/genre.validator.js"
import Genre from "../model/genre.model.js"
import User from "../model/user.model.js"
import { BadUserRequestError } from "../error/error.js"

export default class GenreController {
  static async createGenre(req, res,){
      const {error } = createGenreValidator.validate(req.body)
      if(error) throw error

      const isUserAvailable = await User.findById(req.body.producer)
      if(!isUserAvailable) throw new BadUserRequestError(`User with this id: ${req.body.producer} does not exist`)

      const newGenre = await Genre.create(req.body)
      res.status(200).json({
      message: "Genre created successfully",
      status: "Success",
      data:{
        genre: newGenre
      }
    })
  }


  static async updateOneGenre(req, res){
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Incorrect mongoId")

    const updateValidatorResponse = await updateGenreValidator.validate(req.body)
    const updateGenreError = updateValidatorResponse.error
    if(updateGenreError) throw updateGenreError

    const Genre = await Genre.findById(id)
    if(!Genre) throw new NotFoundError(`The Genre with this id: ${id}, does not exist`)

    const updatedGenre = await Genre.findByIdAndUpdate(id, req.body, {new: true})
    return res.status(200).json({
      message: "Genre updated successfully",
      status: "Success",
      data:{
        genre: updatedGenre
      }
    })
  }



  static async getOneGenre(req, res) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const genre = await Genre.findById(id)
    if(!genre) throw new NotFoundError(`The genre with this id: ${id}, does not exist`)

    return res.status(200).json({
      message: "Genre found successfully",
      status: "Success",
      data: {
        genre: genre
      }
    })
  }


  static async deleteOneGenre(req, res) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const genre = await Genre.findById(id)
    if(!genre) throw new NotFoundError(`The genre with this id: ${id}, does not exist`)

    await Genre.findByIdAndUpdate(id, {
      isDeleted: true
    })

    return res.status(200).json({
      message: "Genre has been deleted",
      status: "Success",
    })
  }


  static async findAll(req, res) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const user = await User.findById(id)
    if(!user) throw new NotFoundError(`The user with this id: ${id}, does not exist`)

    const genres =  await Genre.find({ customerId: id }).populate("customer")

    return res.status(200).json({
      message: genres.length < 1 ? "No Genre found" : "Genre found successfully",
      status: "Success",
      data: {
        genres: genres
      }
    })
  }


}