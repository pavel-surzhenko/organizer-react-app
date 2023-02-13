import * as yup from 'yup';

export const schema: yup.SchemaOf<ISignUpFormShape> = yup.object().shape({
    name: yup.string().required('*'),
    email: yup.string().email().required('*'),
    password: yup.string().required('*'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), 'password must be same']).required('*'),
});

export interface ISignUp extends Omit<ISignUpFormShape, 'confirmPassword'>{}

export interface ISignUpFormShape {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}