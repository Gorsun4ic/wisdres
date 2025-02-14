// Redux
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Custom APIs
import { apiBooksSlice } from "@api/apiBooksSlice";
import { apiAuthorsSlice } from "@api/apiAuthorsSlice";
import { apiPublishersSlice } from "@api/apiPublishersSlice";
import { apiGenresSlice } from "@api/apiGenresSlice";
import { apiLanguagesSlice } from "@api/apiLanguagesSlice";
import { apiUsersSlice } from "@api/apiUsersSlice";
import { apiSearchSlice } from "@api/apiSearchSlice";
import { apiAdminsSlice } from "@api/apiAdminsSlice";
import { apiFiltersSlice } from "@api/apiFilters";
// Custom reducers
import alertReducer from "@reducers/alert";
import filtersReducer from "@reducers/filters";

// Define the store type
export const store = configureStore({
	reducer: {
		[apiBooksSlice.reducerPath]: apiBooksSlice.reducer,
		[apiAuthorsSlice.reducerPath]: apiAuthorsSlice.reducer,
		[apiPublishersSlice.reducerPath]: apiPublishersSlice.reducer,
		[apiGenresSlice.reducerPath]: apiGenresSlice.reducer,
		[apiLanguagesSlice.reducerPath]: apiLanguagesSlice.reducer,
		[apiUsersSlice.reducerPath]: apiUsersSlice.reducer,
		[apiSearchSlice.reducerPath]: apiSearchSlice.reducer,
		[apiAdminsSlice.reducerPath]: apiAdminsSlice.reducer,
		[apiFiltersSlice.reducerPath]: apiFiltersSlice.reducer,
		alert: alertReducer,
		filters: filtersReducer,


	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			apiBooksSlice.middleware,
			apiAuthorsSlice.middleware,
			apiPublishersSlice.middleware,
			apiGenresSlice.middleware,
			apiLanguagesSlice.middleware,
			apiUsersSlice.middleware,
			apiSearchSlice.middleware,
			apiAdminsSlice.middleware,
			apiFiltersSlice.middleware,
		),
});



// Set up listeners for refetching queries
setupListeners(store.dispatch);

// Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
