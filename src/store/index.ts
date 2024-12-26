import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiBooksSlice } from "@api/apiBooksSlice";
import { apiAuthorsSlice } from "@api/apiAuthorsSlice";
import { apiPublishersSlice } from "@api/apiPublishersSlice";
import { apiGenresSlice } from "@api/apiGenresSlice";
import alertReducer from "@reducers/alert";
import activeBookPageReducer from "@reducers/activeBookPage";

// Define the store type
export const store = configureStore({
	reducer: {
		[apiBooksSlice.reducerPath]: apiBooksSlice.reducer,
		[apiAuthorsSlice.reducerPath]: apiAuthorsSlice.reducer,
		[apiPublishersSlice.reducerPath]: apiPublishersSlice.reducer,
		[apiGenresSlice.reducerPath]: apiGenresSlice.reducer,
		alert: alertReducer,
		activeBookPage: activeBookPageReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			apiBooksSlice.middleware,
			apiAuthorsSlice.middleware,
			apiPublishersSlice.middleware,
			apiGenresSlice.middleware
		),
});

// Set up listeners for refetching queries
setupListeners(store.dispatch);

// Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
