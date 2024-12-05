import { Stack } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { StyledBookSort } from "./style";

const BookSort = () => {
	const sortCriterias: string[] = ["Reviews", "Downloads", "Rating"];

	// Check is the element is not last
	const isElementLast = (i:number, arr:string[]) => {
		return i === arr.length - 1;
	}

	return (
		<StyledBookSort direction="row" className="book-sort" gap={1} sx={{alignItems: "center"}}>
			<p>Sort by:</p>
			{sortCriterias.map((item, i, arr) => {
				return (
					<Stack direction="row" gap={1} sx={{alignItems: "center"}}>
						<span>{item}</span>
						{!isElementLast(i, arr) && <FiberManualRecordIcon />}
					</Stack>
				);
			})}
		</StyledBookSort>
	);
};

export default BookSort;
