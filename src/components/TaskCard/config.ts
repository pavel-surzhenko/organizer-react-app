import * as yup from 'yup';

export const schema: yup.SchemaOf<INewTask> = yup.object().shape({
    title: yup
        .string()
        .required('*333'),
    deadline: yup
        .date()
        .required('*'),
    description: yup
        .string()
        .required('*'),
    tag: yup
        .string(),
});

export interface INewTask {
    title: string
    deadline: Date
    description: string
    tag?: string
}
