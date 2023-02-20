import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import { ISignUpFormShape, schema } from './config';
import { api } from '../../api';
import { authActions } from '../../lib/redux/actions';

export const SignUpForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm<ISignUpFormShape>({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    });

    const onSubmit = form.handleSubmit(async (formData: ISignUpFormShape) => {
        const { confirmPassword, ...newUser } = formData;
        const token = await api.auth.signup(newUser);

        if ('data' in token) {
            dispatch(authActions.setToken(token.data));
            localStorage.setItem('token', token.data);
            navigate('/task-manager');
        } else {
            dispatch(authActions.setError(token.message));
        }
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
                        <ErrorMessage
                            errors={form.formState.errors}
                            name='name'
                            render={({ message }) => (
                                <span className='errorMessage'>{message}</span>
                            )}
                        />
                    </label>
                    <label className='label'>
                        <input
                            type='text'
                            placeholder='Email'
                            {...form.register('email')}
                        />
                        <ErrorMessage
                            errors={form.formState.errors}
                            name='email'
                            render={({ message }) => (
                                <span className='errorMessage'>{message}</span>
                            )}
                        />
                    </label>
                    <label className='label'>
                        <input
                            type='Password'
                            placeholder='Password'
                            {...form.register('password')}
                        />
                        <ErrorMessage
                            errors={form.formState.errors}
                            name='password'
                            render={({ message }) => (
                                <span className='errorMessage'>{message}</span>
                            )}
                        />
                    </label>
                    <label className='label'>
                        <input
                            type='password'
                            placeholder='Confirm password'
                            {...form.register('confirmPassword')}
                        />
                        <ErrorMessage
                            errors={form.formState.errors}
                            name='confirmPassword'
                            render={() => (
                                <span className='errorMessage'>{'passwords do not match'}</span>
                            )}
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
