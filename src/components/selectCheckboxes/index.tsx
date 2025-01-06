import { useState, useRef } from "react";
import { Controller, FieldValues, Control } from "react-hook-form";
import {
	Select,
	MenuItem,
	FormControl,
	OutlinedInput,
	InputLabel,
	SelectChangeEvent,
} from "@mui/material";

import Checkbox from "@components/checkbox";

const SelectCheckboxes = ({
	dataList,
	name,
	control,
	label,
}: {
	dataList: { title: string }[];
	name: string;
	control: Control<FieldValues>;
	label: string;
}) => {
	const selectRef = useRef<HTMLDivElement>(null);

	const MAX_CHECKED_ITEMS = 3; // Maximum number of allowed checkboxes

	const ITEM_HEIGHT = 40;
	const ITEM_PADDING_TOP = 0;

	const MenuProps = {
		PaperProps: {
			sx: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: selectRef.current
					? `${selectRef.current.offsetWidth}px`
					: "auto",
			},
		},
	};

	const handleChange = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value },
		} = event;
	};

	return (
		<FormControl sx={{ width: "100%" }}>
			<InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<>
						{(field.value?.length || 0) >= MAX_CHECKED_ITEMS && (
							<p className="error">Max number of genres {MAX_CHECKED_ITEMS}</p>
						)}
						<Select
							{...field}
							ref={selectRef}
							labelId="demo-multiple-checkbox-label"
							sx={{ width: "100%" }}
							id="demo-multiple-checkbox"
							multiple
							value={field.value || []}
							onChange={handleChange}
							input={<OutlinedInput label={label} />}
							renderValue={(selected) =>
								selected
									.map((id) => dataList.find((item) => item._id === id)?.title)
									.join(", ")
							}
							MenuProps={MenuProps}>
							{dataList?.map((item, index) => (
								<MenuItem
									key={index}
									value={item?.title} // Added missing value prop
									sx={{ height: ITEM_HEIGHT }}>
									<Checkbox
										label={item?.title}
										checked={(field.value || []).includes(item?._id)}
										disabled={
											!(field.value || []).includes(item?.title) &&
											(field.value || []).length >= MAX_CHECKED_ITEMS
										}
										onChange={() => {
											// Check if the current number of selected items exceeds the limit
											if (
												!field.value?.includes(item?.title) &&
												(field.value?.length || 0) >= MAX_CHECKED_ITEMS
											) {
												return; // Prevent adding more items
											}
											const newValue = (field.value || []).includes(item?._id)
												? field.value.filter(
														(value: string) => value !== item?._id
												  )
												: [...(field.value || []), item?._id];
											field.onChange(newValue);
										}}
									/>
								</MenuItem>
							))}
						</Select>
					</>
				)}
			/>
		</FormControl>
	);
};

export default SelectCheckboxes;
