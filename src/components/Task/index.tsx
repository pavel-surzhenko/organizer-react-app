import { ITask }  from '../../api'

export const Task: React.FC<IPropTypes> = (props) => {
    console.log(props);
    

    return (
        <div className='task'>
            <span className='title'>First task</span>
            <div className='meta'>
                <span className='deadline'>14 jun 2023</span>
                <span className='tag'>Spotify</span>
            </div>
        </div>
    );
};

interface IPropTypes extends ITask {}