import { Link } from 'react-router-dom';

export const SignUpForm: React.FC = () => {
    return (
        <section className='publish-tip sign-form'>
            <form>
                <fieldset>
                    <legend>Registration</legend>
                    <label className='label'>
                        <input placeholder='Name' type='text' name='name' />
                    </label>
                    <label className='label'>
                        <input type='text' placeholder='Email' name='email' />
                    </label>
                    <label className='label'>
                        <input
                            type='Password'
                            placeholder='Password'
                            name='password'
                        />
                    </label>
                    <label className='label'>
                        <input
                            type='password'
                            placeholder='Confirm password'
                            name='confirmPassword'
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
