import express from "express";
import cors from "cors";
import bookRoutes from "./routes/books.js";
import authorRoutes from "./routes/authors.js";
import connectDB from "./config/db.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
