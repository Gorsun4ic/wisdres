// activeBookPage.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IBookInfo } from "@custom-types/book";

interface activeBookPage {
	activeBook: IBookInfo | null;
}

const initialState: activeBookPage = {
	activeBook: null,
};

const activeBookPageSlice = createSlice({
	name: "activeBook",
	initialState,
	reducers: {
		showBook: (state, action: PayloadAction<IBookInfo>) => {
			state.activeBook = action.payload;
		},
	},
});

export const { showBook } = activeBookPageSlice.actions;
export default activeBookPageSlice.reducer;
