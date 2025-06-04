import { Link } from "react-router-dom";
import { Grid2 } from "@mui/material";

import { useGetPublishersQuery } from "@api/apiPublishersSlice";

import SearchBar from "@components/search-bar";

import { StyledPublishersPage } from "./style";

const publishers: [string, number][] = [
	["Penguin Random House", 500],
	["HarperCollins", 400],
	["Simon & Schuster", 350],
	["Macmillan", 300],
	["Hachette Book Group", 250],
	["Oxford University Press", 200],
	["Bloomsbury", 150],
	["Scholastic", 100],
	["Springer", 50],
	["Cambridge University Press", 75],
	["Wiley", 500],
	["Pearson", 450],
	["Thomson Reuters", 400],
	["Elsevier", 350],
	["MIT Press", 300],
	["Routledge", 250],
	["Princeton University Press", 200],
	["Cambridge University Press", 175],
	["Blackwell Publishing", 150],
	["Berkley Books", 120],
	["Farrar, Straus and Giroux", 100],
	["Knopf Doubleday Publishing Group", 90],
	["St. Martin's Press", 80],
	["Workman Publishing", 70],
	["Taschen", 60],
	["Viking Press", 50],
	["William Morrow and Company", 40],
	["New York Review Books", 30],
	["Cengage Learning", 25],
	["Andrews McMeel Publishing", 20],
	["Avon Books", 19],
	["Kensington Publishing", 18],
	["Zondervan", 17],
	["HarperOne", 16],
	["Little, Brown and Company", 15],
	["Houghton Mifflin Harcourt", 14],
	["Grand Central Publishing", 13],
	["Chronicle Books", 12],
	["Graywolf Press", 11],
	["Alfred A. Knopf", 10],
	["W.W. Norton & Company", 9],
	["Beacon Press", 8],
	["Crown Publishing Group", 7],
	["Tyndale House Publishers", 6],
	["Flatiron Books", 5],
	["Perseus Books", 4],
	["Bantam Books", 3],
	["HarperCollins Christian Publishing", 2],
	["Zaffre", 1],
	["Secker & Warburg", 1],
	["Phaidon Press", 2],
	["Ecco Press", 3],
	["The Folio Society", 4],
	["Portobello Books", 5],
	["The Overlook Press", 6],
	["Viking Books for Young Readers", 7],
	["Holiday House", 8],
	["Candlewick Press", 9],
	["Workman Publishing", 10],
	["Scholastic Press", 11],
	["Grove Press", 12],
	["Aladdin Paperbacks", 13],
	["Duckworth", 14],
	["Canongate Books", 15],
	["Faber & Faber", 16],
	["Milkweed Editions", 17],
	["Gibson Square Books", 18],
	["Portobello Books", 19],
	["Granta", 20],
	["Virago", 21],
	["Picador", 22],
	["David & Charles", 23],
	["Liveright Publishing Corporation", 24],
	["Scribner", 25],
	["Piatkus", 26],
	["Corgi Books", 27],
	["Shambhala Publications", 28],
	["Knopf Publishing Group", 29],
	["Kogan Page", 30],
	["Seventh Street Books", 31],
	["Houghton Mifflin", 32],
	["Edizioni Mondadori", 33],
	["Atria Books", 34],
	["Doubleday", 35],
	["Hyperion Books", 36],
	["Delacorte Press", 37],
	["Orion Books", 38],
	["Gallery Books", 39],
	["Farrar, Straus and Giroux", 40],
	["Silver Oak", 41],
	["HarperCollins Publishers", 42],
	["PoliPointPress", 43],
	["Tartarus Press", 44],
	["Severn House", 45],
	["Arcade Publishing", 46],
	["Hachette Livre", 47],
	["HarperCollins UK", 48],
	["Viking Press", 49],
	["Adventures Unlimited Press", 50],
	["Wings", 51],
	["Bloomsbury Publishing", 52],
	["Scribe Publications", 53],
	["Penguin UK", 54],
	["Penguin Classics", 55],
	["Virago Press", 56],
	["Zodiac Press", 57],
	["Macmillan Publishing", 58],
	["Westholme Publishing", 59],
	["Dundurn Press", 60],
	["Sourcebooks", 61],
	["Arcadia Books", 62],
	["Myriad Editions", 63],
	["Levine Querido", 64],
	["Little, Brown Book Group", 65],
	["Batsford", 66],
	["Rizzoli", 67],
	["Redhook", 68],
	["Free Press", 69],
	["Picador USA", 70],
	["Blackstone Audio", 71],
	["The University of Chicago Press", 72],
	["University of California Press", 73],
	["The New Press", 74],
	["Bantam Doubleday Dell", 75],
	["Ediciones Salamandra", 76],
	["Princeton University Press", 77],
	["North Point Press", 78],
	["Ediciones Anagrama", 79],
	["The Book Folks", 80],
	["Arcturus Publishing", 81],
	["Grove Atlantic", 82],
	["Anthem Press", 83],
	["J. B. Lippincott & Co.", 84],
	["Corvus", 85],
	["Penguin Books UK", 86],
	["Tin House", 87],
	["Brooklyn Books", 88],
	["Balzer + Bray", 89],
	["Tinder Press", 90],
	["George Weidenfeld & Nicolson", 91],
	["Macmillan Audio", 92],
	["Subterranean Press", 93],
	["Head of Zeus", 94],
	["Unbound", 95],
	["Scribner UK", 96],
	["Granta Books", 97],
	["Akashic Books", 98],
	["Ebury Press", 99],
	["Morrow Paperbacks", 100],
];


const PublishersPage = () => {

	const {data: publishers} = useGetPublishersQuery(null);

	const publishersList = publishers?.map((item) => {
		// const [authorName, authorBooksAmount] = item;
		return (
			<Grid2 size={3}>
				<Link to={`/publisher/${item?._id}`}>
					{item?.title}
					{` (${item?.bookIds?.length})`}
				</Link>
			</Grid2>
		);
	});

	return (
		<StyledPublishersPage>
			<h1>Publishers</h1>
			<SearchBar />
			<Grid2 container spacing={1} className="publishers-list">
				{publishersList}
			</Grid2>
		</StyledPublishersPage>
	);
};

export default PublishersPage;
