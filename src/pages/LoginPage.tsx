import { LoginForm } from '../components';
import { useToken } from '../hooks/useToken';

export const LoginPage: React.FC = () => {
    document.title = 'Login'
    useToken();

    return <LoginForm />;
};
