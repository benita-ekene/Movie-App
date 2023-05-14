import { Router } from "express";
import GenreController from "../controllers/genre.controller.js";
import { tryCatchHandler } from "../utils/tryCatch.handler.js";
import {userAuthMiddleWare} from "../middleware/auth.js"

const router = Router();

router.post("/create", userAuthMiddleWare,  tryCatchHandler(GenreController.createGenre));

router.put("/update", userAuthMiddleWare, tryCatchHandler( GenreController.updateOneGenre))

router.get("/one", userAuthMiddleWare, tryCatchHandler( GenreController.getOneGenre))

router.get("/all_genre", userAuthMiddleWare, tryCatchHandler( GenreController.findAll))

router.delete("/delete",  userAuthMiddleWare, tryCatchHandler( GenreController.deleteOneGenre))

//Exporting genre router
export { router };