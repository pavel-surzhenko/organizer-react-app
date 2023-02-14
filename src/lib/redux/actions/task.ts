import { api, ITask } from "../../../api"
import { AppThunk } from "../init/store"
import { taskTypes } from "../types"
import { authActions } from "./auth"

export const taskActions = Object.freeze({
    startFetching: () => {
        return {
            type: taskTypes.START_FETCHING,
        }
    },

    stopFetching: () => {
        return {
            type: taskTypes.STOP_FETCHING,
        }
    },

    fetchTask: (tasks: ITask[]) => {
        return {
            type: taskTypes.FETCH_TASKS,
            payload: tasks,
        }
    },

    fetchTaskAsync: (): AppThunk => async (dispatch) => {
        try {
            dispatch(taskActions.startFetching())
            const tasks = await api.tasks.getTasks()
            dispatch(taskActions.fetchTask(tasks))
        } catch (error: any) {
            const { message } = error;
            dispatch(authActions.setError(message))
        } finally {
            dispatch(taskActions.stopFetching());
        }
    }
})