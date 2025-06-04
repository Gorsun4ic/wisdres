import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { ICategories } from "@custom-types/categories";
import { StyledHeaderCategories } from "./style";

// Component for rendering the list of items (strings)
const ContentList = ({ arr }: { arr: string[] }) => {
	return arr.map((item, i) => {
		if (i < 7) {
			return (
				<Link to={item.toLowerCase()} key={i} className="category-item">
					{item}
				</Link>
			);
		} else {
			return null;
		}
	});
};

// Component for rendering categories (ICategories[])
const CategoriesList = ({ data }: { arr: ICategories[] }) => {
	const {content, link} = data;
	
	return content.map((item, i) => (
		<Stack key={i}>
			<Stack gap={1} sx={{ marginBottom: 2 }}>
				{/* Here, we pass 'item.content' to ContentList */}
				<ContentList arr={item.content} />
			</Stack>
			<Link to={link} className="category-all">
				Watch all
			</Link>
		</Stack>
	));
};

interface HeaderCategoriesProps {
	arr: ICategories[];
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

const HeaderCategories: React.FC<HeaderCategoriesProps> = ({
	data,
	onMouseEnter,
	onMouseLeave,
}) => {
	if (!data || !Array.isArray(data.content)) {
		return null;
	}

	return (
		<StyledHeaderCategories
			direction="row"
			gap={32}
			className="header__categories"
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}>
			{/* Pass arr as a prop to CategoriesList */}
			<CategoriesList data={data} />
		</StyledHeaderCategories>
	);
};
export default HeaderCategories;
