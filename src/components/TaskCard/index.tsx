import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { api, ITag } from '../../api';
import { toastOptions } from '../../constants/toastOptions';
import { authActions, tagsActions, taskActions } from '../../lib/redux/actions';
import { getSelectedTask, getTagId, getTags } from '../../lib/redux/selectors';
import { Tag } from '../Tag';
import { INewTask, schema } from './config';

export const TaskCardForm: React.FC<ITaskSeleсted> = (props) => {
    const dispatch = useDispatch();
    const selectedTagId = useSelector(getTagId);
    const isNew = useSelector(getSelectedTask) === 'new';

    const form = useForm<INewTask>({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        dispatch(tagsActions.fetchTagsAsync());
        form.setFocus('title');
    }, []);

    const tags = useSelector(getTags);

    const tagsJSX = tags.map((task: ITag) => {
        return <Tag key={task.id} {...task} />;
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

        const token = isNew
            ? await api.tasks.create(taskData)
            : await api.tasks.update(taskData, props?.id);

        if ('data' in token) {
            dispatch(taskActions.setTaskId(''));
            dispatch(taskActions.fetchTaskAsync());
            toast.success(
                `${isNew ? 'Task created' : 'Task updated'}`,
                toastOptions
            );
            form.reset();
        } else if('message' in token) {
            dispatch(authActions.setError(token.message));
        }
    });

    const resetForm = () => {
        form.reset();
        setSelectedDate(
            props?.deadline ? new Date(props.deadline) : new Date()
        );
    };

    const removeTask = async () => {
        const token = await api.tasks.delete(props.id);

        if (token) {
            dispatch(authActions.setError(token.message));
        } else {
            dispatch(taskActions.setTaskId(''));
            dispatch(taskActions.fetchTaskAsync());
            toast.success('Task deleted', toastOptions);
        }
    };

    const completeTask = async () => {
        const data = {
            completed: true,
            title: form.watch('title'),
            description: form.watch('description'),
            deadline: selectedDate.toJSON(),
            tag: selectedTagId,
        };

        const token = await api.tasks.update(data, props?.id);

        if ('data' in token) {
            dispatch(taskActions.setTaskId(''));
            dispatch(taskActions.fetchTaskAsync());
            toast.info('Task completed', toastOptions);
        } else if('message' in token){
            dispatch(authActions.setError(token.message));
        }
    };

    return (
        <div className='task-card'>
            <form onSubmit={onSubmit}>
                <div className='head'>
                    {isNew ? (
                        ''
                    ) : (
                        <>
                            <button
                                type='button'
                                onClick={completeTask}
                                className='button-complete-task'
                            >
                                to complete
                            </button>
                            <div
                                onClick={removeTask}
                                className='button-remove-task'
                            ></div>
                        </>
                    )}
                </div>
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
                    <div className='errors'>
                        <ErrorMessage
                            errors={form.formState.errors}
                            name='title'
                            render={({ message }) => (
                                <p className='errorMessage'>{message}</p>
                            )}
                        />
                        <ErrorMessage
                            errors={form.formState.errors}
                            name='description'
                            render={({ message }) => (
                                <p className='errorMessage'>{message}</p>
                            )}
                        />
                    </div>
                    <div className='form-controls'>
                        <button
                            className='button-reset-task'
                            type='reset'
                            onClick={resetForm}
                        >
                            Reset
                        </button>
                        <button
                            className='button-save-task'
                            type='submit'
                            disabled={!form.formState.isValid || !selectedTagId}
                        >
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
