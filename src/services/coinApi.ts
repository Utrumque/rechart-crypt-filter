import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { ICoinResponce } from "../models/IChartResponse"

export const coinApi = createApi({
	reducerPath: "coinApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://min-api.cryptocompare.com/",
	}),
	refetchOnFocus: false,
	endpoints: (builder) => ({
		getLast24Hours: builder.query<ICoinResponce, String>({
			query: (coin) => ({
				url: `data/v2/histohour?fsym=${coin}&tsym=USD&limit=24`,
			}),
		}),
		getLast30Days: builder.query<ICoinResponce, String>({
			query: (coin) => ({
				url: `data/v2/histoday?fsym=${coin}&tsym=USD&limit=30`,
			}),
		}),
		getLastWeek: builder.query<ICoinResponce, String>({
			query: (coin) => ({
				url: `data/v2/histoday?fsym=${coin}&tsym=USD&limit=7`,
			}),
		}),
	}),
})

export const { useGetLast24HoursQuery, useGetLast30DaysQuery, useGetLastWeekQuery } = coinApi
