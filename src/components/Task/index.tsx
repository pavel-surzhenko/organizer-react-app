import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { ITask } from '../../api';
import { taskActions } from '../../lib/redux/actions';
import { Tag } from '../Tag';

export const Task: React.FC<IPropTypes> = (props) => {
    const dispatch = useDispatch();
    const { title, deadline, tag, completed, id } = props;
    const date = format(new Date(deadline), 'd MMM, yyyy');

    const handleClick = () => {
        dispatch(taskActions.setTaskId(id));
    };

    return (
        <div
            onClick={handleClick}
            className={`task ${completed ? 'completed' : ''}`}
        >
            <span className='title'>{title}</span>
            <div className='meta'>
                <span className='deadline'>{date}</span>
                <Tag {...tag} />
            </div>
        </div>
    );
};

interface IPropTypes extends ITask {}
