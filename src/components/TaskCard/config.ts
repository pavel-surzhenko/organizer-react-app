import * as yup from 'yup';

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
