import express from 'express';
import UserController from '../controllers/user.controller.js'
import { tryCatchHandler } from '../utils/tryCatch.handler.js'

const router = new express.Router()

router.post("/create", tryCatchHandler( UserController.createUser) )
router.get("/", tryCatchHandler( UserController.findUser) )
router.post("/login", tryCatchHandler( UserController.loginUser) )

//expoting user router
export { router }

