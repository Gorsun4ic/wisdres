// alertSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAlert {
	title: string;
	color: string;
}

interface AlertState {
	alert: IAlert | null;
}

const initialState: AlertState = {
	alert: null,
};

const alertSlice = createSlice({
	name: "alert",
	initialState,
	reducers: {
		showAlert: (state, action: PayloadAction<IAlert>) => {
			state.alert = action.payload;
		},
		hideAlert: (state) => {
			state.alert = null;
		},
	},
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
