// filters.ts
import { createSlice } from "@reduxjs/toolkit";

export interface IFilter {
	sortBy: string;
	filters: {
		authors: string[] | [];
		publishers: string[] | [];
		languages: string[] | [];
		pages: [number, number] | null;
	};
}

const initialState: IFilter = {
	sortBy: "",
	filters: {
		authors: [],
		publishers: [],
		languages: [],
		pages: null,
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
