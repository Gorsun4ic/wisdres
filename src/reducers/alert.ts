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
			console.log("Inside showAlert reducer");
			console.log("Payload received:", action.payload);
			state.alert = action.payload;
		},
		hideAlert: (state) => {
			console.log("Inside hideAlert reducer");
			state.alert = null;
		},
	},
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
