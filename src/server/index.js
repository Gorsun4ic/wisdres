import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/wisdres", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (error) => {
	console.error("MongoDB connection error:", error);
});

// Define the schema and model
const BookSchema = new mongoose.Schema({
	img: String,
	rating: Number, // You can use Decimal128 if needed
	title: String,
	genre: [String], // Explicitly define genre as an array of strings
	author: String,
	publisher: String,
	language: String,
	year: Number,
	pages: Number,
});

const Book = mongoose.model("Book", BookSchema);

// Endpoint to get all books
app.get("/books", async (req, res) => {
	try {
		const books = await Book.find();
		res.json(books);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch books" });
	}
});

// Endpoint to get a single book by ID
app.get("/books/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const book = await Book.findById(id);

		if (!book) {
			return res.status(404).json({ error: "Book not found" });
		}

		res.json(book);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to fetch book" });
	}
});

// Endpoint to add a new book
app.post("/books", async (req, res) => {
    const {
        img,
        rating,
        title,
        genre,
        author,
        publisher,
        language,
        year,
        pages,
    } = req.body;

    try {
        // Validate required fields
        if (!title || !author || !publisher) {
            return res.status(400).json({ error: "Title, author, and publisher are required" });
        }

        // Create a new book
        const newBook = new Book({
            img,
            rating,
            title,
            genre,
            author,
            publisher,
            language,
            year,
            pages,
        });

        // Save the book to the database
        await newBook.save();

        res.status(201).json(newBook); // Return the newly created book
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add book" });
    }
});

// Endpoint to delete a book by ID
app.delete("/books/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the book by ID and delete it
        const deletedBook = await Book.findByIdAndDelete(id);

        // If the book was not found, return a 404 error
        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Respond with a success message
        res.json({ message: "Book deleted successfully", book: deletedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete book" });
    }
});

// Endpoint to update a book by ID (Partial Update)
app.patch("/books/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the book by ID and update only the fields provided in req.body
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });

        // If the book was not found, return a 404 error
        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Respond with the updated book
        res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update book" });
    }
});
// Endpoint to update a book by ID (Partial Update)
app.patch("/books/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the book by ID and update only the fields provided in req.body
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });

        // If the book was not found, return a 404 error
        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Respond with the updated book
        res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update book" });
    }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
