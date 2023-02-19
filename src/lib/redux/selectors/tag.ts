import { RootState } from '../init/store';

export const getTags = (state: RootState) => {
    return state.tag.tags
};

export const getTagId = (state: RootState): string => {
    return state.tag.tagId
};