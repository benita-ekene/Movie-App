import User from "../model/user.model.js"
import { createUserValidator } from "../validator/user.validator.js"
import { mongoIdValidator } from "../validator/mongoId.validator.js"
import { BadUserRequestError, NotFoundError } from "../error/error.js"
import { Types } from "mongoose"

export default class UserController {

    static async createUser(req, res ) {
      const {error, value} = createUserValidator.validate(req.body)
      if(error) throw error

      const newUser = await User.create(req.body)
      res.status(200).json({
      message: "User has been created",
      status: "Success",
      data:{
        user: newUser
        }
      })
    }


  static async findUser(req, res,) {
    const { id } = req.query
    const {error} = mongoIdValidator.validate(req.query)
    if(error) throw new BadUserRequestError("Please pass in a valid mongoId")

    const user = await User.findById(id)
    if (!user) throw new NotFoundError('User not found')

    res.status(200).json({
    message: "User found successfully",
    status: "Success",
    data:{
      user
      }
    })
  }

}
