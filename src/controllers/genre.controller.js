import {createGenreValidator, updateGenreValidator} from "../validator/genre.validator.js"
import Genre from "../model/genre.model.js"
import User from "../model/user.model.js"
import { BadUserRequestError } from "../error/error.js"
import { mongoIdValidator } from "../validator/mongoId.validator.js"

export default class GenreController {
  static async createGenre(req, res,){
      const {error } = createGenreValidator.validate(req.body)
      if(error) throw error

      const newGenre = await Genre.create({...req.body, customer: req.user._id, customerId: req.user._id })
      res.status(201).json({
      message: "Genre has been created successfully",
      status: "Success",
      data:{
        genre: newGenre
      }
    })
  }

  static async updateOneGenre(req, res){
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const updateValidatorResponse = await updateGenreValidator.validate(req.body)
    const updateGenreError = updateValidatorResponse.error
    if(updateGenreError) throw updateGenreError

    const genre = await Genre.findById(id)
    if(!genre) throw new NotFoundError(`This id: ${id}, does not match any existing genre`)

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
    if(!genre) throw new NotFoundError(`This id: ${id}, does not match any existing genre`)

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
    if(!genre) throw new NotFoundError(`This id: ${id}, does not match any existing genre`)

    await Genre.findByIdAndUpdate(id, {
      isDeleted: true
    })

    return res.status(200).json({
      message: "Genre deleted successfully",
      status: "Success",
    })
  }


  static async findAll(req, res) {
const id = req.user._id
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const user = await User.findById(id)
    if(!user) throw new NotFoundError(`The user with this id: ${id}, does not exist`)

    const genres =  await Genre.find({ customerId: id }).populate("customer")

    return res.status(200).json({
      message: genres.length < 1 ? "No genres" : "genres found successfully",
      status: "Success",
      data: {
        genres: genres
      }
    })
  }


}