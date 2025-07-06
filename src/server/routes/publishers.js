import express from "express";
import {
	getAllPublishers,
	getPublisherById,
	createPublisher,
	deletePublisher,
	updatePublisher,
} from "../controllers/publisherController.js";

const router = express.Router();

router.get("/", getAllPublishers);
router.get("/:id", getPublisherById);
router.post("/", createPublisher);
router.delete("/:id", deletePublisher);
router.patch("/:id", updatePublisher);

export default router;
