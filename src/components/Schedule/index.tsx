import React from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"

import { ethereum } from "../../data"

import { ISchedule } from "./types"

export const Schedule: React.FC = () => {
	const [info, setInfo] = React.useState<ISchedule[]>(ethereum)
	const [selectVal, setSelectVal] = React.useState("hours")

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectVal(e.target.value)
	}

	// const list = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

	//  Не могу долго сидеть над таким маленьким, но интересным заданием, а спросить не у кого, как правильно сделать.
	//  Был бы рад, если бы скинули hr готовый вариант, очень интересно как правильно

	//  Сортировки не правильно работает, потому что с таким исходником даты что-то сделать головная боль,
	//  был бы таймстамп, то можно было бы сделать нормально. Или я не допер как сделать, целый день с докой ковырялся от либы.
	//	В самой либе можно как-то сортировать мне кажется, но я не понял как.
	//  Задание хоть и маленькое но над ним можно долго просидеть, прикрутить календарь и при клике в нем сортировать и тп.

	const sorting = (e: any) => {
		if (selectVal === "hours") {
			return String(e.time).slice(9, 11)
		} else if (selectVal === "days") {
			return String(e.time).slice(6, 8)
		} else if (selectVal === "weeks") {
			return String(e.time).slice(6, 8)
		}
	}

	return (
		<>
			<LineChart width={1000} height={500} data={info}>
				<CartesianGrid stroke='#ccc' />
				<XAxis dataKey={(e) => sorting(e)} allowDuplicatedCategory={false} />
				<YAxis />
				<Line type='monotone' dataKey={(e) => String(e.gasPrice).slice(0, 2)} stroke='#8884d8' />
			</LineChart>
			<label style={{ marginLeft: 50 }}>
				Sort by:
				<select value={selectVal} onChange={handleChange} style={{ marginLeft: 5 }}>
					<option value='hours'>hours</option>
					<option value='days'>days</option>
					<option value='weeks'>weeks</option>
				</select>
			</label>
		</>
	)
}
