import { api, ITag } from "../../../api"
import { AppThunk } from "../init/store"
import { tagTypes } from "../types"
import { authActions } from "./auth"

export const tagsActions = Object.freeze({
    startFetching: () => {
        return {
            type: tagTypes.START_FETCHING,
        }
    },

    stopFetching: () => {
        return {
            type: tagTypes.STOP_FETCHING,
        }
    },

    fetchTask: (tags: ITag[]) => {
        return {
            type: tagTypes.FETCH_TASKS,
            payload: tags,
        }
    },

    fetchTaskAsync: (): AppThunk => async (dispatch) => {
        try {
            dispatch(tagsActions.startFetching())
            const tags = await api.tags.getTags()
            dispatch(tagsActions.fetchTask(tags))
        } catch (error: any) {
            const { message } = error;
            dispatch(authActions.setError(message))
        } finally {
            dispatch(tagsActions.stopFetching());
        }
    }
})