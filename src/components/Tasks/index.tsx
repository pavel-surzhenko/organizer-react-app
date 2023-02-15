import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITask } from '../../api';
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

    const tasks = useSelector(getTasks);    

    useEffect(()=> {
        dispatch(taskActions.fetchTaskAsync())
    }, [])

    const taskJSX = tasks.map((task: ITask) => {
        return <Task key={task.id} {...task} />
    })

    return (
        <>
            <div className='controls'>
                <i className='las'></i>
                <button onClick={handleClick} className='button-create-task'>New Task</button>
            </div>
            <div className='wrap'>
                <div className={tasks.length ? 'list': 'list empty'}>
                    <div className='tasks'>{ taskJSX }</div>
                </div>
                {open && <TaskCardForm />}
            </div>
        </>
    );
};
