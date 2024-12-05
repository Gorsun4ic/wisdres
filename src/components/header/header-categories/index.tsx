import { Stack } from "@mui/material";
import { ICategories } from "@custom-types/categories";
import { StyledHeaderCategories } from "./style";

// Component for rendering the list of items (strings)
const ContentList = ({ arr }: { arr: string[] }) => {
	return arr.map((item, i) => {
		if (i < 7) {
			return (
				<a href="#" key={i} className="category-item">
					{item}
				</a>
			);
		} else {
			return null;
		}
	});
};

// Component for rendering categories (ICategories[])
const CategoriesList = ({ arr }: { arr: ICategories[] }) => {
	return arr.map((item, i) => (
		<Stack key={i}>
			<a href="#" className="category-title">
				{item.title}
			</a>
			<Stack gap={1} sx={{ marginBottom: 2 }}>
				{/* Here, we pass 'item.content' to ContentList */}
				<ContentList arr={item.content} />
			</Stack>
			<a href="#" className="category-all">
				{item.more || "Watch all"}
			</a>
		</Stack>
	));
};

interface HeaderCategoriesProps {
	arr: ICategories[];
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

const HeaderCategories: React.FC<HeaderCategoriesProps> = ({
	arr,
	onMouseEnter,
	onMouseLeave,
}) => {
	if (!arr || !Array.isArray(arr)) {
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
			<CategoriesList arr={arr} />
		</StyledHeaderCategories>
	);
};
export default HeaderCategories;
