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

    fetchTags: (tags: ITag[]) => {
        return {
            type: tagTypes.FETCH_TASKS,
            payload: tags,
        }
    },

    fetchTagsAsync: (): AppThunk => async (dispatch) => {
        try {
            dispatch(tagsActions.startFetching())
            const tags = await api.tags.getTags()
            dispatch(tagsActions.fetchTags(tags))
        } catch (error: any) {
            const { message } = error;
            dispatch(authActions.setError(message))
        } finally {
            dispatch(tagsActions.stopFetching());
        }
    },

    setTagId: (tagId: string) => {
        return {
            type: tagTypes.SET_SELECTED_TAG_ID,
            payload: tagId
        }
    },
})