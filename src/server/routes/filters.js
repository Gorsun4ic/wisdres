import express from "express";
import {transformFilterIdsToTitles} from "../controllers/filterController.js";

const router = express.Router();

router.post("/transform-filter-ids-to-titles", transformFilterIdsToTitles);

export default router;
