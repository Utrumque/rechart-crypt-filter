import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { coinApi } from "../services/coinApi"

export const store = configureStore({
	reducer: {
		[coinApi.reducerPath]: coinApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coinApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
