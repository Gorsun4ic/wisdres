import { Grid2 } from "@mui/material";
import SearchBar from "@components/search-bar";
import { StyledAuthorsPage } from "./style";

const authors: [string,number][] = [
	["J.K. Rowling", 15],
	["George R.R. Martin", 24],
	["Stephen King", 63],
	["J.R.R. Tolkien", 35],
	["Agatha Christie", 66],
	["Isaac Asimov", 50],
	["Mark Twain", 28],
	["Charles Dickens", 20],
	["Jane Austen", 7],
	["Leo Tolstoy", 16],
	["F. Scott Fitzgerald", 5],
	["Ernest Hemingway", 12],
	["Haruki Murakami", 15],
	["Franz Kafka", 10],
	["H.G. Wells", 30],
	["Ray Bradbury", 27],
	["William Shakespeare", 39],
	["Gabriel García Márquez", 27],
	["Chimamanda Ngozi Adichie", 7],
	["Toni Morrison", 11],
	["Virginia Woolf", 8],
	["John Steinbeck", 16],
	["George Orwell", 9],
	["Kurt Vonnegut", 14],
	["J.D. Salinger", 4],
	["Oscar Wilde", 10],
	["Hermann Hesse", 20],
	["Margaret Atwood", 17],
	["Harper Lee", 2],
	["Philip K. Dick", 44],
	["Dante Alighieri", 1],
	["Herman Melville", 9],
	["C.S. Lewis", 17],
	["Jules Verne", 54],
	["Alice Walker", 9],
	["Sylvia Plath", 4],
	["J.R. Ward", 18],
	["Neil Gaiman", 20],
	["Dan Brown", 7],
	["Khaled Hosseini", 4],
	["Patrick Rothfuss", 3],
	["William Faulkner", 16],
	["Arthur Conan Doyle", 63],
	["Suzanne Collins", 6],
	["Rick Riordan", 25],
	["Louisa May Alcott", 9],
	["Cormac McCarthy", 10],
	["Gillian Flynn", 6],
	["Jodi Picoult", 25],
	["Ian McEwan", 13],
	["Donna Tartt", 3],
	["Zadie Smith", 7],
	["Liane Moriarty", 9],
	["Neil deGrasse Tyson", 3],
	["Stephen Hawking", 10],
	["James Patterson", 150],
	["Danielle Steel", 170],
	["Pat Conroy", 10],
	["David Foster Wallace", 5],
	["George Saunders", 10],
	["David Mitchell", 8],
	["Muriel Spark", 22],
	["Ralph Waldo Emerson", 7],
	["Emily Dickinson", 2],
	["John Green", 10],
	["Clive Cussler", 60],
	["Dean Koontz", 105],
	["Lee Child", 30],
	["L.J. Smith", 12],
	["Alice Munro", 14],
	["E.L. James", 7],
	["Elena Ferrante", 9],
	["Maya Angelou", 7],
	["Ken Follett", 30],
	["Barbara Kingsolver", 14],
	["Zora Neale Hurston", 7],
	["Tana French", 8],
	["Katherine Paterson", 9],
	["Robert Louis Stevenson", 20],
	["Douglas Adams", 8],
	["Bill Bryson", 30],
	["Ruth Ware", 7],
	["Celia Ahern", 15],
	["John Grisham", 45],
	["Stephen King", 63],
	["John le Carré", 25],
	["Graham Greene", 24],
	["Joan Didion", 10],
	["Milan Kundera", 10],
	["Terry Pratchett", 41],
	["Michael Ende", 8],
	["Bernhard Schlink", 8],
	["Carlos Ruiz Zafón", 9],
	["Richard Adams", 10],
	["Neil Strauss", 5],
	["J.M. Coetzee", 13],
	["Annie Proulx", 8],
	["Mitch Albom", 10],
	["Richard Wright", 6],
	["J.R.R. Tolkien", 35],
	["Jack London", 24],
	["Thomas Hardy", 15],
	["Raymond Carver", 6],
	["William Gibson", 13],
	["Philip Roth", 29],
	["Isaac Bashevis Singer", 20],
	["Eugene O'Neill", 9],
	["Henrik Ibsen", 13],
	["Mikhail Bulgakov", 6],
];


const AuthorsPage = () => {

	const List = authors.map(item => {
		const [authorName, authorBooksAmount] = item;
		return <Grid2 size={3}>{authorName}{` (${authorBooksAmount})`}</Grid2>;
	})

	return (
		<StyledAuthorsPage>
			<h1>Authors</h1>
			<SearchBar />
			<Grid2 container spacing={1} className="authors-list">
				{List}
			</Grid2>
		</StyledAuthorsPage>
	)
};

export default AuthorsPage;