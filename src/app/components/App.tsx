import React from "react"
import { useAppState } from "../AppState"

export function App() {
	const tableDatabase = useAppState((data) => data.tableData)

	return (
		<div
			style={{
				maxWidth: "100%",
				width: "24em",
				margin: "0 auto",
			}}
		>
			<h2>Table Editor</h2>
			<table>
				{tableDatabase.map((tableData, rowIndex: number) => {
					return (
						<tr key={rowIndex}>
							{Object.keys(tableData).map((item, cellIndex) => (
								<TableCell
									rowIndex={rowIndex}
									cellIndex={cellIndex}
									cellData={tableData[item]}
								/>
							))}
						</tr>
					)
				})}
			</table>
		</div>
	)
}

function TableCell({ cellData, rowIndex, cellIndex }) {
	const handleClick = () => {
		console.log("cellIndex", cellIndex)
		console.log("rowIndex", rowIndex)
	}
	return (
		<td
			onClick={handleClick}
			style={{ border: "1px solid black", padding: "12px" }}
		>
			{cellData}
		</td>
	)
}
