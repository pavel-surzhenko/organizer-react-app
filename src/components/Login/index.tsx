import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { authActions } from '../../lib/redux/actions';
import { ILoginFormShape, schema } from './config';

export const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm<ILoginFormShape>({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    });

    const onSubmit = form.handleSubmit(async (data: ILoginFormShape) => {
        const token = await api.auth.login(
            window.btoa(`${data?.email}:${data?.password}`)
        );
        if (token) {
            dispatch(authActions.setToken(token));
            localStorage.setItem('token', token);
            navigate('/task-manager');
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
                    </label>
                    <label className='label'>
                        <input
                            type='password'
                            placeholder='Password'
                            {...form.register('password')}
                        />
                    </label>
                    <input
                        type='submit'
                        className='button-login'
                        value='log in'
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
