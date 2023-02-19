import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { api, ITag } from '../../api';
import { tagsActions, taskActions } from '../../lib/redux/actions';
import { getSelectedTask, getTagId, getTags } from '../../lib/redux/selectors';
import { Tag } from '../Tag';
import { INewTask, schema } from './config';

export const TaskCardForm: React.FC<ITaskSeleсted> = (props) => {
    const dispatch = useDispatch();
    const selectedTagId = useSelector(getTagId);
    const isNew = useSelector(getSelectedTask) === 'new';

    useEffect(() => {
        dispatch(tagsActions.fetchTagsAsync());
    }, []);

    const tags = useSelector(getTags);

    const tagsJSX = tags.map((task: ITag) => {
        return <Tag key={task.id} {...task} />;
    });

    const form = useForm<INewTask>({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    });

    const [selectedDate, setSelectedDate] = useState(
        props?.deadline ? new Date(props.deadline) : new Date()
    );

    useEffect(() => {
        form.reset();
        setSelectedDate(
            props?.deadline ? new Date(props.deadline) : new Date()
        );
    }, [props]);

    const onSubmit = form.handleSubmit(async (data) => {
        const taskData = {
            completed: false,
            title: data.title,
            description: data.description,
            deadline: selectedDate.toJSON(),
            tag: selectedTagId,
        };
        await api.tasks.create(taskData);
        dispatch(taskActions.fetchTaskAsync());
        form.reset();
    });

    return (
        <div className='task-card'>
            <form onSubmit={onSubmit}>
                <div className='head'></div>
                <div className='content'>
                    <label className='label'>
                        Tasks
                        <input
                            defaultValue={`${isNew ? '' : props.title}`}
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
                                        name='deadline'
                                        control={form.control}
                                        defaultValue={selectedDate}
                                        render={({ field }) => (
                                            <ReactDatePicker
                                                minDate={new Date()}
                                                selected={selectedDate}
                                                onChange={(date: Date) =>
                                                    field.onChange(
                                                        setSelectedDate(date)
                                                    )
                                                }
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
                                defaultValue={`${
                                    isNew ? '' : props.description
                                }`}
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

interface ITaskSeleсted {
    id?: string;
    completed?: boolean;
    title?: string;
    description?: string;
    deadline?: string;
    tag?: ITag;
}
