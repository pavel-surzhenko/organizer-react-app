import * as yup from 'yup';

export const schema: yup.SchemaOf<ILoginFormShape> = yup.object().shape({
    email: yup.string().email().required('*'),
    password: yup.string().required('*'),
});

export interface ILoginFormShape {
    email: string;
    password: string;
}