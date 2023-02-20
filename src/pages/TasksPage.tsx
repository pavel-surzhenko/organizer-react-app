import { Tasks } from '../components';
import { useToken } from '../hooks/useToken';

export const TasksPage: React.FC = () => {
    useToken();

    return <Tasks />;
};
