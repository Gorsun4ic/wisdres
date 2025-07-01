import { useState, useEffect } from "react";
import {
	filterLanguages,
	filterAuthors,
	filterPublishers,
} from "@reducers/filters";
import { useDispatch } from "react-redux";

import { TextField, List, ListItem } from "@mui/material";

import { stringTuple } from "@custom-types/filter";

import Checkbox from "@components/checkbox";

import { StyledScrolledFilter } from "./style";

const ScrolledFilter = ({
	title,
	data,
	placeholder,
	type,
}: {
	title: string;
	data: stringTuple[];
	placeholder: string;
	type: "languages" | "authors" | "publishers";
}) => {
	const dispatch = useDispatch();
	const [checkedItems, setCheckedItems] = useState<string[]>([]);
	const [originalItems, setOriginalItems] = useState<stringTuple[]>([]);
	const [filterItems, setFilterItems] = useState<stringTuple[]>([]);

	useEffect(() => {
		if (data) {
			setOriginalItems(data); // Save original list once
			setFilterItems(data); // Initially show everything
		}
	}, [data]);

	const handleSearch = (query: string) => {
		if (!query) {
			setFilterItems(originalItems); // Reset to full list if query is empty
			return;
		}

		const filteredData = originalItems.filter((item) =>
			item[1].toLowerCase().includes(query.toLowerCase())
		);
		setFilterItems(filteredData);
	};
	

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
				break;
		}
	}, [checkedItems, dispatch, type]);

	const handleCheckboxChange = (id: string) => {
		setCheckedItems((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};

	if (!data) return null;

	const checkboxesList = filterItems.map((item) => {
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
			{data.length > 5 && <TextField placeholder={placeholder} onChange={(event) => {handleSearch(event.target.value)}}/>}
			<List>{checkboxesList}</List>
		</StyledScrolledFilter>
	);
};

export default ScrolledFilter;
