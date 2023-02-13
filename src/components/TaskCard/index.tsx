export const TaskCardForm: React.FC = () => {
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
                                    <input type='text' value='13 jun 2023' />
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
                    <div className='tags'>
                        <span
                            className='tag'
                            style={{
                                color: 'rgb(255, 171, 43)',
                                backgroundColor: 'rgb(255, 250, 240)',
                            }}
                        >
                            Sketch
                        </span>
                        <span
                            className='tag selected'
                            style={{
                                color: 'rgb(109, 210, 48)',
                                backgroundColor: 'rgb(245, 253, 240)',
                            }}
                        >
                            Spotify
                        </span>
                        <span
                            className='tag'
                            style={{
                                color: 'rgb(254, 77, 151);',
                                backgroundColor: 'rgb(255, 244, 249)',
                            }}
                        >
                            Dribble
                        </span>
                        <span
                            className='tag'
                            style={{
                                color: 'rgb(77, 124, 254);',
                                backgroundColor: 'rgb(240, 243, 251)',
                            }}
                        >
                            Behance
                        </span>
                        <span
                            className='tag'
                            style={{
                                color: 'rgb(134, 134, 134)',
                                backgroundColor: 'rgb(236, 236, 236)',
                            }}
                        >
                            UX
                        </span>
                    </div>
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
