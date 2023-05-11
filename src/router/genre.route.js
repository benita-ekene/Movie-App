import {Router} from "express"
import GenreController from "../controllers/genre.controller.js"
import { tryCatchHandler} from "../utils/tryCatch.handler.js"

const router = Router()

router.post("/create",  tryCatchHandler( GenreController.createGenre))

export {router}