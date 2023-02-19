import { RootState } from '../init/store';

export const getTags = (state: RootState) => {
    return state.tag.tags
};
