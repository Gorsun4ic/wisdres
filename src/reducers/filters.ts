// filters.ts
import { createSlice } from "@reduxjs/toolkit";

interface IFilter {
	sortBy: string;
	filters: {
		authors: string[] | [];
		publishers: string[] | [];
		languages: string[] | [];
		pages: [number, number] | [null, null];
	};
}

const initialState: IFilter = {
	sortBy: "",
	filters: {
		authors: [],
		publishers: [],
		languages: [],
		pages: [null, null],
	},
};

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		sortBy: (state, action) => {
			state.sortBy = action.payload;
		},
		filterLanguages: (state, action) => {
			state.filters.languages = action.payload;
		},
		filterAuthors: (state, action) => {
			state.filters.authors = action.payload;
		},
		filterPublishers: (state, action) => {
			state.filters.publishers = action.payload;
		},
		setPageFilter: (state, action) => {
			state.filters.pages = action.payload;
		},
	},
});

export const {
	sortBy,
	filterLanguages,
	filterAuthors,
	filterPublishers,
	setPageFilter,
} = filtersSlice.actions;
export default filtersSlice.reducer;
