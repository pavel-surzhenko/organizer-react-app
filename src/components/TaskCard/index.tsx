import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { ITag } from '../../api';
import { tagsActions } from '../../lib/redux/actions';
import { getTags } from '../../lib/redux/selectors';
import { Tag } from '../Tag';

export const TaskCardForm: React.FC = () => {
    const [startDate, setStartDate] = useState(new Date());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tagsActions.fetchTaskAsync());
    }, []);

    const tags = useSelector(getTags);

    const tagsJSX = tags.map((task: ITag) => {
        return <Tag key={task.id} {...task} />;
    });

    return (
        <div className='task-card'>
            <form>
                <div className='head'></div>
                <div className='content'>
                    <label className='label'>
                        Tasks
                        <input
                            type='text'
                            className='title'
                            placeholder='Do homeworks'
                            name='title'
                        />
                    </label>
                    <div className='deadline'>
                        <span className='label'>Deadline</span>
                        <span className='date'>
                            <div className='react-datepicker-wrapper'>
                                <div className='react-datepicker__input-container'>
                                    <ReactDatePicker
                                        minDate={startDate}
                                        selected={startDate}
                                        onChange={(date: Date) =>
                                            setStartDate(date)
                                        }
                                        dateFormat='d MMM, yyyy'
                                    />
                                </div>
                            </div>
                        </span>
                    </div>
                    <div className='description'>
                        <label className='label'>
                            Description
                            <textarea
                                name='description'
                                className='text'
                                placeholder='Do homework before the weekend'
                            ></textarea>
                        </label>
                    </div>
                    <div className='tags'>{tagsJSX}</div>
                    <div className='errors'></div>
                    <div className='form-controls'>
                        <button className='button-reset-task' type='reset'>
                            Reset
                        </button>
                        <button className='button-save-task' type='submit'>
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
