import { Link } from "react-router-dom";

export const LoginForm: React.FC = () => {
    return (
        <section className="sign-form">
            <form>
                <fieldset>
                    <legend>Log in</legend>
                    <label className="label">
                        <input placeholder="Email" type="text" name="email" />
                    </label>
                    <label className="label">
                        <input type="password" placeholder="password" name="password"/>
                    </label>
                    <input type="submit" className="button-login" value='log in'/>
                </fieldset>
                <p>if you don&#39;t have an account, you can 
                    <Link to ='/signup'> register</Link>
                </p>
            </form>
        </section>
    );
};