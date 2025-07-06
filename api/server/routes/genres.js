import express from "express";
import {
	getAllGenres,
	getGenreById,
	createGenre,
	deleteGenre,
	updateGenre,
} from "../controllers/genresController.js";

const router = express.Router();

router.get("/", getAllGenres);
router.get("/:id", getGenreById);
router.post("/", createGenre);
router.delete("/:id", deleteGenre);
router.patch("/:id", updateGenre);

export default router;
