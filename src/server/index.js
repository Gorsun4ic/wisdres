import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import bookRoutes from "./routes/books.js";
import authorRoutes from "./routes/authors.js";
import publisherRoutes from "./routes/publishers.js";
import genreRoute from "./routes/genres.js";
import languageRoute from "./routes/languages.js";
import userRoute from "./routes/users.js";
import searchRoutes from "./routes/searchRoutes.js";
import adminRoute from "./routes/admins.js";
import connectDB from "./config/db.js";


const app = express();

// Middleware
app.use(express.json());
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true
}));
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

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
