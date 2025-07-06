// api/server.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import bookRoutes from "../src/server/routes/books.js"; 
import authorRoutes from "../src/server/routes/authors.js";
import publisherRoutes from "../src/server/routes/publishers.js";
import genreRoute from "../src/server/routes/genres.js";
import languageRoute from "../src/server/routes/languages.js";
import userRoute from "../src/server/routes/users.js";
import searchRoutes from "../src/server/routes/searchRoutes.js";
import adminRoute from "../src/server/routes/admins.js";
import connectDB from "../src/server/config/db.js"; 

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
console.log('Middleware configured.'); // After middleware setup

app.use((req, res, next) => {
	console.log("--- Incoming Request Details ---");
	console.log("Original URL (req.originalUrl):", req.originalUrl); // Full original URL from client
	console.log("URL (req.url):", req.url); // Path from the mount point, or same as originalUrl if no mount
	console.log("Path (req.path):", req.path); // Just the pathname of the request
	console.log("Method (req.method):", req.method);
	console.log("--- End Request Details ---");
	next(); // IMPORTANT: Pass control to the next middleware/route in the chain
});


// Connect to MongoDB
connectDB();
console.log('connectDB() called.'); // After calling DB connection

// app.get("*", (req, res) => {
// 	console.log("--- Temporary Catch-All Route Hit ---");
// 	console.log("req.path:", req.path);
// 	console.log("req.url:", req.url);
// 	res.status(200).json({
// 		message: "Temporary catch-all hit!",
// 		path_from_server: req.path, // What Express sees as the path
// 		url_from_server: req.url, // What Express sees as the URL
// 	});
// });

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/publishers", publisherRoutes);
app.use("/api/genres", genreRoute);
app.use("/api/languages", languageRoute);
app.use("/api/users", userRoute);
app.use("/api/search", searchRoutes);
app.use("/api/admins", adminRoute);
console.log('All routes mounted.'); // After all routes are mounted

// Add a general error handling middleware (IMPORTANT for seeing server-side errors)
app.use((err, req, res, next) => {
    console.error('--- UNHANDLED SERVER ERROR ---');
    console.error(err.stack || err); // Log the full error stack
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
        error: err.name,
        // Only send stack in development for security
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
});


export default app;
