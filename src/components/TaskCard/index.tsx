import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ITag } from '../../api';
import { tagsActions } from '../../lib/redux/actions';
import { getTags } from '../../lib/redux/selectors';
import { Tag } from '../Tag';
import { INewTask, schema } from './config';

export const TaskCardForm: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tagsActions.fetchTaskAsync());
    }, []);

    const tags = useSelector(getTags);

    const tagsJSX = tags.map((task: ITag) => {
        return <Tag key={task.id} {...task} />;
    });

    const form = useForm<INewTask>({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    });

    const onSubmit = form.handleSubmit((data) => {
        console.log(data);
        // console.log(data.deadline.toJSON())
        // data.deadline = data.deadline.toJSON()
        console.log(data);
        
    });

    return (
        <div className='task-card'>
            <form onSubmit={onSubmit}>
                <div className='head'></div>
                <div className='content'>
                    <label className='label'>
                        Tasks
                        <input
                            type='text'
                            className='title'
                            placeholder='Do homeworks'
                            {...form.register('title')}
                        />
                    </label>
                    <div className='deadline'>
                        <span className='label'>Deadline</span>
                        <span className='date'>
                            <div className='react-datepicker-wrapper'>
                                <div className='react-datepicker__input-container'>
                                    <Controller
                                        name={'deadline'}
                                        control={form.control}
                                        defaultValue={new Date()}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <ReactDatePicker
                                                minDate={new Date()}
                                                selected={value || new Date()}
                                                onChange={onChange}
                                                dateFormat='d MMM, yyyy'
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </span>
                    </div>
                    <div className='description'>
                        <label className='label'>
                            Description
                            <textarea
                                className='text'
                                placeholder='Do homework before the weekend'
                                {...form.register('description')}
                            ></textarea>
                        </label>
                    </div>
                    <div className='tags'>{tagsJSX}</div>
                    <div className='errors'></div>
                    <div className='form-controls'>
                        <button
                            className='button-reset-task'
                            type='reset'
                            onClick={() => form.reset()}
                        >
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
