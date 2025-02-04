// alertSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
	isAuthenticated: boolean;
	isVerifying: boolean;
}

const initialState: AuthState = {
	isAuthenticated: false,
	isVerifying: false,
};

const authSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		authenticate: (state, action) => {
			state.isAuthenticated = action.payload;
		},
		processVerification: (state, action) => {
			state.isVerifying = action.payload;
		}	},
});

export const { authenticate, processVerification } = authSlice.actions;
export default authSlice.reducer;
