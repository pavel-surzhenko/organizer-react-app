import * as yup from 'yup';

export const schema: yup.SchemaOf<ISignUpFormShape> = yup.object().shape({
    name: yup.string().min(3).required(''),
    email: yup.string().email().required(''),
    password: yup.string().min(8).required(''),
    confirmPassword: yup.string().oneOf([yup.ref('password')]).required('passwords do not match'),
});

export interface ISignUp extends Omit<ISignUpFormShape, 'confirmPassword'>{}

export interface ISignUpFormShape {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}