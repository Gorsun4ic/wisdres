// api/index.js (або server.js)
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import bookRoutes from "./server/routes/books.js"; 
import authorRoutes from "./server/routes/authors.js";
import publisherRoutes from "./server/routes/publishers.js";
import genreRoute from "./server/routes/genres.js";
import languageRoute from "./server/routes/languages.js";
import userRoute from "./server/routes/users.js";
import searchRoutes from "./server/routes/searchRoutes.js";
import adminRoute from "./server/routes/admins.js";
import connectDB from "./server/config/db.js"; 

const app = express();

// Middleware
app.use(express.json());
app.use(
	cors({
		origin: process.env.CLIENT_URL, 
		credentials: true,
	})
);
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/publishers", publisherRoutes);
app.use("/genres", genreRoute);
app.use("/languages", languageRoute);
app.use("/users", userRoute);
app.use("/search", searchRoutes);
app.use("/admins", adminRoute);

export default app;
