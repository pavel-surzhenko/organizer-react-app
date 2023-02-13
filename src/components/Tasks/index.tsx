import { useState } from 'react';
import { Task } from '../Task';
import { TaskCardForm } from '../TaskCard';

export const Tasks: React.FC = () => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true);
    }

    return (
        <>
            <div className='controls'>
                <i className='las'></i>
                <button onClick={handleClick} className='button-create-task'>New Task</button>
            </div>
            <div className='wrap'>
                <div className='list empty'>
                    <div className='tasks'><Task /></div>
                </div>
                {open && <TaskCardForm />}
            </div>
        </>
    );
};
