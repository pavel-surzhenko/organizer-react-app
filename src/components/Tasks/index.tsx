import { Task } from '../Task';

export const Tasks: React.FC = () => {
    return (
        <div className='wrap'>
            <div className='list'>
                <div className='tasks'>
                    <Task />
                </div>
            </div>
        </div>
    );
};
