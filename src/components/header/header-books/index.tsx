import { Container } from "@mui/material";
import { StyledSubCategories } from "../style";
import { ICategories } from "@custom-types/categories";
import HeaderCategories from "../header-categories";


const fiction: ICategories = {
	title: "Fiction",
	content: [
	"Adventure",
	"Fantasy",
	"Science Fiction",
	"Mystery & Thriller",
	"Romance",
	"Historical Fiction",
	"Horror",
	"Literary Fiction",
	"Young Adult",
]
}

const nonFiction: ICategories = {
	title: "Non-fiction",
	content: [
		"Biography & Memoir",
		"Self-Help & Personal Development",
		"Business & Economics",
		"History",
		"Science & Technology",
		"True Crime",
		"Health & Wellness",
		"Religion & Spirituality",
	],
};

const BookGenresList: ICategories[] = [fiction, nonFiction];


const HeaderBooks = () => {
	return (
		<Container>
			<StyledSubCategories direction="row" gap={32}>
				<Container
					maxWidth="lg"
					sx={{
						"&.MuiContainer-maxWidthLg": {
							maxWidth: "1600px",
						},
					}}>
					<HeaderCategories arr={BookGenresList} />
				</Container>
			</StyledSubCategories>
		</Container>
	);
};

export default HeaderBooks;