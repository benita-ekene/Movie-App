import { Router } from "express";
import GenreController from "../controllers/genre.controller.js";
import { tryCatchHandler } from "../utils/tryCatch.handler.js";

const router = Router();

router.post("/create", tryCatchHandler(GenreController.createGenre));

router.put("/update", tryCatchHandler( GenreController.updateOneGenre))

router.get("/one", tryCatchHandler( GenreController.getOneGenre))

router.get("/all", tryCatchHandler( GenreController.findAll))

router.delete("/delete", tryCatchHandler( GenreController.deleteOneGenre))

export { router };