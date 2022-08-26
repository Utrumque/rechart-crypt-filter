import React, { useEffect } from "react"

import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
} from "recharts"

import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

import {
	useGetLast24HoursQuery,
	useGetLast30DaysQuery,
	useGetLastWeekQuery,
} from "../../services/coinApi"

import { ISchedule } from "./types"

export const ChartGas: React.FC = () => {
	const [info, setInfo] = React.useState<ISchedule[]>()
	const [sortVal, setSortVal] = React.useState("Day")
	const [coinVal, setCoinVal] = React.useState("GAS")

	const { data: last24Hours, isSuccess } = useGetLast24HoursQuery(coinVal)
	const { data: last30Days } = useGetLast30DaysQuery(coinVal)
	const { data: last7Days } = useGetLastWeekQuery(coinVal)

	function activeDate() {
		if (sortVal === "Day") {
			return info?.map((q) => new Date(Number(q.time) * 1000).getHours()).sort((a, b) => +a - +b)
		} else if (sortVal === "Month") {
			return info?.map((q) => new Date(Number(q.time) * 1000).getDate()).sort((a, b) => +a - +b)
		} else {
			return info?.map((q) => String(new Date(Number(q.time) * 1000)).slice(0, 3))
		}
	}

	useEffect(() => {
		if (sortVal === "Day") {
			return setInfo(last24Hours?.Data.Data)
		} else if (sortVal === "Month") {
			return setInfo(last30Days?.Data.Data)
		} else {
			return setInfo(last7Days?.Data.Data)
		}
	}, [sortVal, coinVal])

	useEffect(() => {
		isSuccess && setInfo(last24Hours.Data.Data)
	}, [isSuccess])

	const handleSortChange = (e: SelectChangeEvent) => {
		setSortVal(e.target.value as string)
	}

	const handleCoinChange = (e: SelectChangeEvent) => {
		setCoinVal(e.target.value as string)
	}

	return (
		<>
			<ResponsiveContainer width='95%' height={600}>
				<LineChart width={1200} height={600} data={info} style={{ padding: 10 }}>
					<CartesianGrid stroke='#ccc' />
					<XAxis dataKey={activeDate} allowDuplicatedCategory={false} />
					<YAxis domain={["dataMin", "dataMax"]} unit='$' />
					<Line type='monotone' dataKey={(e) => e.high} stroke='#8884d8' />
					<Tooltip />
				</LineChart>
			</ResponsiveContainer>
			<Box style={{ display: "flex", justifyContent: "space-around" }}>
				<FormControl sx={{ width: 80, marginTop: 2 }}>
					<InputLabel id='demo-simple-select-label'>Sort by last</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={sortVal}
						label='Sort by last'
						onChange={handleSortChange}
					>
						<MenuItem value='Day'>Day</MenuItem>
						<MenuItem value='Month'>Month</MenuItem>
						<MenuItem value='Week'>Week</MenuItem>
					</Select>
				</FormControl>
				<FormControl sx={{ width: 80, marginTop: 2 }}>
					<InputLabel id='demo-simple-select-label'>Coin</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={coinVal}
						label='Coin'
						onChange={handleCoinChange}
					>
						<MenuItem value='GAS'>GAS</MenuItem>
						<MenuItem value='BTC'>BTC</MenuItem>
					</Select>
				</FormControl>
			</Box>
		</>
	)
}
