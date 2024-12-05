import RangeSlider from "@components/range-slider";
import { StyledBookFilters } from "./style";
import ScrolledFilter from "./scrolled-filter";

const filters = {
	authors: [
		"George Orwell", // Author of "1984"
		"J.K. Rowling", // Author of the "Harry Potter" series
		"J.R.R. Tolkien", // Author of "The Lord of the Rings"
		"Agatha Christie", // Author of "Murder on the Orient Express"
		"Jane Austen", // Author of "Pride and Prejudice"
		"F. Scott Fitzgerald", // Author of "The Great Gatsby"
		"Ernest Hemingway", // Author of "The Old Man and the Sea"
		"Mark Twain", // Author of "The Adventures of Tom Sawyer"
		"Harper Lee", // Author of "To Kill a Mockingbird"
		"Gabriel García Márquez", // Author of "One Hundred Years of Solitude"
		"Leo Tolstoy", // Author of "War and Peace"
		"Fyodor Dostoevsky", // Author of "Crime and Punishment"
		"Charles Dickens", // Author of "Great Expectations"
		"Stephen King", // Author of "The Shining"
		"J.D. Salinger", // Author of "The Catcher in the Rye"
		"John Steinbeck", // Author of "The Grapes of Wrath"
		"Herman Melville", // Author of "Moby Dick"
		"Victor Hugo", // Author of "Les Misérables"
		"Margaret Atwood", // Author of "The Handmaid's Tale"
		"Khaled Hosseini", // Author of "The Kite Runner"
	],
	publishers: [
		"Penguin Random House", // One of the largest publishers in the world
		"HarperCollins", // Publisher of "The Hobbit" and many more
		"Simon & Schuster", // Known for a wide range of fiction and nonfiction
		"Macmillan Publishers", // Publisher of "Nature" and other scientific works
		"Hachette Livre", // Publisher of "Twilight" series
		"Scholastic", // Publisher of the "Harry Potter" series in the US
		"Bloomsbury Publishing", // Original publisher of the "Harry Potter" series
		"Oxford University Press", // Academic and educational books
		"Cambridge University Press", // Academic and research publishing
		"Pearson Education", // Educational books and resources
		"Wiley", // Publisher of academic and professional materials
		"McGraw Hill", // Textbooks and academic resources
		"Harlequin", // Known for romance novels
		"Tor Books", // Science fiction and fantasy books
		"Pan Macmillan", // Publisher of a diverse range of books
		"Faber and Faber", // Publisher of poetry and literary fiction
		"Vintage Books", // Imprint of Penguin Random House for literary classics
		"Alfred A. Knopf", // Known for high-quality fiction and nonfiction
		"Little, Brown and Company", // Publisher of "The Catcher in the Rye"
		"DK (Dorling Kindersley)", // Publisher of beautifully illustrated reference books
	],
	languages: ["English", "Ukrainian", "Spanish", "German", "Italian"]
}
const BookFilters = () => {
	return (
		<StyledBookFilters>
			<span>Filters</span>
			<ScrolledFilter
				data={filters.authors}
				placeholder="Write authors name"
				title="Authors"
			/>
			<ScrolledFilter
				data={filters.publishers}
				placeholder="Write publisher name"
				title="Publishers"
			/>
			<ScrolledFilter
				data={filters.languages}
				placeholder="Write language"
				title="Languages"
			/>
			<RangeSlider />
		</StyledBookFilters>
	);
};

export default BookFilters;