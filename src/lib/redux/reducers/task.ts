import { AnyAction } from "redux"
import { taskTypes } from "../types"

const initialState = {
    id: '',
    tasks: [],
    isFetching: false,
}

export const taskReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case taskTypes.START_FETCHING: {
            return {
                ...state,
                isFetching: true,
            }
        }

        case taskTypes.STOP_FETCHING: {
            return {
                ...state,
                isFetching: false,
            }
        }

        case taskTypes.FETCH_TASKS: {
            return {
                ...state,
                isFetching: true,
                tasks: action?.payload
            }
        }

        case taskTypes.SET_SELECTED_TASK: {
            return {
                ...state,
                id: action?.payload
            }
        }

        default: {
            return state
        }
    }
}