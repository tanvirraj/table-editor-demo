import { useEffect, useMemo, useState } from "react"
import { useEnvironment } from "./Environment"
import { shallowEqual } from "./helpers/shallowEqual"
import { uniqueId } from "./helpers/uniqueId"
import { useRefCurrent } from "./hooks/useRefCurrent"
import { StateMachine } from "./StateMachine"

export function newTableCellKey(): string {
	return uniqueId()
}

const initialTableData = [
	{
		[newTableCellKey()]: "chet",
		[newTableCellKey()]: "corcos",
	},
	{
		td1: "Tanvir",
		td2: "Raj",
	},
	{
		td1: "",
		td2: "",
	},
]

const tableDatabase = { tableData: initialTableData }
export type TableData = typeof tableDatabase

export function newTableData(): TableData {
	return tableDatabase
}

const reducers = {}

export class AppState extends StateMachine<TableData, typeof reducers> {
	constructor(initialGame: TableData) {
		super(initialGame, reducers)
	}
}

export function useAppState<T>(selector: (state: TableData) => T) {
	const { app } = useEnvironment()
	const initialState = useMemo(() => {
		return selector(app.state)
	}, [])

	const [state, setState] = useState(initialState)
	const currentStateRef = useRefCurrent(state)

	useEffect(() => {
		return app.addListener(() => {
			const nextState = selector(app.state)
			if (shallowEqual(currentStateRef.current, nextState)) return
			setState(nextState)
		})
	}, [])

	return state
}
