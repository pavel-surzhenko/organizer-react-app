import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITask } from '../../api';
import { taskActions } from '../../lib/redux/actions';
import { getSelectedTask, getTasks } from '../../lib/redux/selectors';
import { Task } from '../Task';
import { TaskCardForm } from '../TaskCard';

export const Tasks: React.FC = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(taskActions.setTaskId('new'))
    }

    const tasks = useSelector(getTasks);
    const selectedTaskId = useSelector(getSelectedTask);
    const selectedTask = tasks.find((task) => task.id === selectedTaskId)      

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
                {selectedTaskId === 'new' && <TaskCardForm /> || selectedTaskId && <TaskCardForm {...selectedTask}/>}
            </div>
        </>
    );
};
