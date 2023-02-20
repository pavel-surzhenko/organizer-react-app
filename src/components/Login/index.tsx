import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import { authActions } from '../../lib/redux/actions';
import { ILoginFormShape, schema } from './config';

export const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm<ILoginFormShape>({
        mode: 'all',
        resolver: yupResolver(schema),
    });

    const onSubmit = form.handleSubmit(async (data: ILoginFormShape) => {
        const token = await useLogin(data);

        if ('data' in token) {
            dispatch(authActions.setToken(token.data));
            localStorage.setItem('token', token.data);
            navigate('/task-manager');
        } else {
            dispatch(authActions.setError(token.message));
        }
    });

    return (
        <section className='sign-form'>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <legend>Log in</legend>
                    <label className='label'>
                        <input
                            placeholder='Email'
                            type='text'
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
                            type='password'
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
                    <input
                        type='submit'
                        className='button-login'
                        value='log in'
                        disabled={!form.formState.isValid}
                    />
                </fieldset>
                <p>
                    if you don&#39;t have an account, you can
                    <Link to='/signup'> register</Link>
                </p>
            </form>
        </section>
    );
};
