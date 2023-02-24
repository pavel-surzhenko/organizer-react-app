import { Tasks } from '../components';
import { useToken } from '../hooks/useToken';

export const TasksPage: React.FC = () => {
    document.title = 'Tasks manager'

    useToken();

    return <Tasks />;
};
