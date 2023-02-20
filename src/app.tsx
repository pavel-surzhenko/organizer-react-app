// Core
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';

// Components
import { Navigation } from './components';
import { useErrorMessage } from './hooks/useErrorMessage';
import { useToken } from './hooks/useToken';
import { LoginPage, SignUpPage, TasksPage } from './pages';

export const App: FC = () => {
    useErrorMessage();
    useToken()

    return (
        <>
            <ToastContainer newestOnTop transition={Slide} />

            <Navigation />
            <main>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SignUpPage />} />
                    <Route path='/task-manager' element={<TasksPage />} />

                    <Route
                        path='*'
                        element={<Navigate to='/task-manager' replace />}
                    />
                </Routes>
            </main>
        </>
    );
};
