import { format } from 'date-fns';
import { ITask } from '../../api';
import { Tag } from '../Tag';

export const Task: React.FC<IPropTypes> = (props) => {
    const { title, deadline, tag, completed } = props;
    const date = format(new Date(deadline), 'd MMM, yyyy');

    return (
        <div className={`task ${completed ? 'completed' : ''}`}>
            <span className='title'>{title}</span>
            <div className='meta'>
                <span className='deadline'>{date}</span>
                <Tag {...tag} />
            </div>
        </div>
    );
};

interface IPropTypes extends ITask {}
