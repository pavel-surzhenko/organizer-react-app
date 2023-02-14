import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from '../../lib/redux/actions';
import { getTasks } from '../../lib/redux/selectors';
import { Task } from '../Task';
import { TaskCardForm } from '../TaskCard';

export const Tasks: React.FC = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true);
    }

    useEffect(()=> {
        dispatch(taskActions.fetchTaskAsync())
    }, [])

    const tasks = useSelector(getTasks);
    console.log(tasks);
    


    return (
        <>
            <div className='controls'>
                <i className='las'></i>
                <button onClick={handleClick} className='button-create-task'>New Task</button>
            </div>
            <div className='wrap'>
                <div className='list'>
                    <div className='tasks'><Task /></div>
                </div>
                {open && <TaskCardForm />}
            </div>
        </>
    );
};
