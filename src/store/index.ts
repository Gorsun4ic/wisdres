import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiBooksSlice } from "@api/apiBooksSlice";
import alertReducer from "@reducers/alert";


// Define the store type
export const store = configureStore({
	reducer: {
		[apiBooksSlice.reducerPath]: apiBooksSlice.reducer,
		alert: alertReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiBooksSlice.middleware),
});

// Set up listeners for refetching queries
setupListeners(store.dispatch);

// Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
