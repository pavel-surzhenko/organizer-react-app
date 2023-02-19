import { AnyAction } from "redux"
import { tagTypes } from "../types"

const initialState = {
    tags: [],
    isFetching: false,
}

export const tagReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case tagTypes.START_FETCHING: {
            return {
                ...state,
                isFetching: true,
            }
        }

        case tagTypes.STOP_FETCHING: {
            return {
                ...state,
                isFetching: false,
            }
        }

        case tagTypes.FETCH_TASKS: {
            return {
                ...state,
                isFetching: true,
                tags: action?.payload
            }
        }

        default: {
            return state
        }
    }
}