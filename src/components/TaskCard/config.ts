import * as yup from 'yup';
import { ITag } from '../../api';

export const schema: yup.SchemaOf<INewTask> = yup.object().shape({
    title: yup
        .string()
        .min(3)
        .required(''),
    deadline: yup
        .date(),
    description: yup
        .string()
        .min(3)
        .required('*'),
    tag: yup
        .string(),
});

export interface INewTask {
    title: string
    deadline?: Date
    description: string
    tag?: string
}

export interface ITaskSeleсted {
    id?: string;
    completed?: boolean;
    title?: string;
    description?: string;
    deadline?: string;
    tag?: ITag;
}