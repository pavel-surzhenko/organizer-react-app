import { Tasks } from "../components";

export const TasksPage: React.FC = () => {
    return (
        <>
            <div className='controls'>
                <i className="las"></i>
                <button className="button-create-task">New Task</button>
            </div>
            <Tasks />
        </>
    );
};
