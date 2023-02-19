import { RootState } from '../init/store';

export const getTasks = (state: RootState) => {
    return state.task.tasks
};

export const getSelectedTask = (state: RootState): string => {
    return state.task.id
};