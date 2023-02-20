import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
