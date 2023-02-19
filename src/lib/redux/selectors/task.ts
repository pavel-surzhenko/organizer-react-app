import { ITask } from '../../../api';
import { RootState } from '../init/store';

export const getTasks = (state: RootState): ITask[] => {
    return state.task.tasks
};

export const getSelectedTask = (state: RootState): string => {
    return state.task.id
};