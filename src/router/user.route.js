import express from 'express';
import UserController from '../controllers/user.controller.js'
import { tryCatchHandler } from '../utils/tryCatch.handler.js'

// User Router
const router = new express.Router()

// User Route
router.post("/create", tryCatchHandler( UserController.createUser) )
router.get("/", tryCatchHandler( UserController.findUser) )


//Exporting the User Route
export { router }

