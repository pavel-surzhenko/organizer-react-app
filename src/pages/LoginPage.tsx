import { LoginForm } from '../components';
import { useToken } from '../hooks/useToken';

export const LoginPage: React.FC = () => {
    useToken();

    return <LoginForm />;
};
