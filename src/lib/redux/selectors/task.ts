import { RootState } from '../init/store';

export const getTasks = (state: RootState) => {
    return state.task.tasks
};
