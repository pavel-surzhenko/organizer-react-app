import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { ISignUpFormShape, schema } from './config';
import { api } from '../../api';

export const SignUpForm: React.FC = () => {
    const form = useForm<ISignUpFormShape>({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    });

    const onSubmit = form.handleSubmit(async (data: ISignUpFormShape) => {
        const { confirmPassword, ...newUser } = data;
        const { data: token } = await api.auth.signup(newUser);        
        localStorage.setItem('token', token);
    });

    return (
        <section className='publish-tip sign-form'>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <legend>Registration</legend>
                    <label className='label'>
                        <input
                            placeholder='Name'
                            type='text'
                            {...form.register('name')}
                        />
                    </label>
                    <label className='label'>
                        <input
                            type='text'
                            placeholder='Email'
                            {...form.register('email')}
                        />
                    </label>
                    <label className='label'>
                        <input
                            type='Password'
                            placeholder='Password'
                            {...form.register('password')}
                        />
                    </label>
                    <label className='label'>
                        <input
                            type='password'
                            placeholder='Confirm password'
                            {...form.register('confirmPassword')}
                        />
                    </label>
                    <input
                        type='submit'
                        className='button-login'
                        value='Register'
                    />
                </fieldset>
                <p>
                    to
                    <Link to='/login'> login</Link>
                </p>
            </form>
        </section>
    );
};
