import express from "express";
import { searchAll, searchByGenre } from "../controllers/searchController.js";

const router = express.Router();

// GET /search?q={searchTerm}
router.get("/", searchAll);

// GET /search/genre/:genre
router.get("/genre/:genre", searchByGenre);

export default router;
