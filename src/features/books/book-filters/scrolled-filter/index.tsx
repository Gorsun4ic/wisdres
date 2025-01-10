import { useState, useEffect } from "react";
import {
	filterLanguages,
	filterAuthors,
	filterPublishers,
} from "@reducers/filters";
import { useDispatch } from "react-redux";

import { TextField, List, ListItem } from "@mui/material";

import Checkbox from "@components/checkbox";

import { StyledScrolledFilter } from "./style";

const ScrolledFilter = ({
	title,
	data,
	placeholder,
	type,
}: {
	title: string;
	data: string[];
	placeholder: string;
	type: "languages" | "authors" | "publishers";
}) => {
	const dispatch = useDispatch();
	const [checkedItems, setCheckedItems] = useState<string[]>([]);

	const dataMap = new Map(data.map(([id, name]) => [id, name]));
	const uniqueDataArr = Array.from(dataMap.entries());

	useEffect(() => {
		switch (type) {
			case "languages":
				dispatch(filterLanguages(checkedItems));
				break;
			case "authors":
				dispatch(filterAuthors(checkedItems));
				break;
			case "publishers":
				dispatch(filterPublishers(checkedItems));
				break;
			default:
				console.log("Type is wrong");
				break;
		}
	}, [checkedItems]);

	const handleCheckboxChange = (label: string) => {
		setCheckedItems(
			(prev) =>
				prev.includes(label)
					? prev.filter((item) => item !== label) // Remove if checked
					: [...prev, label] // Add if not checked
		);
	};

	const checkboxesList = uniqueDataArr.map((item) => {
		return (
			<ListItem key={item[0]}>
				<Checkbox
					label={item[1]}
					checked={checkedItems.includes(item[0])}
					onChange={() => handleCheckboxChange(item[0])}
				/>
			</ListItem>
		);
	});

	return (
		<StyledScrolledFilter className="scrolled-filter">
			<span className="scrolled-filter__name">{title}</span>
			{uniqueDataArr.length > 5 && <TextField placeholder={placeholder} />}
			<List>{checkboxesList}</List>
		</StyledScrolledFilter>
	);
};

export default ScrolledFilter;
