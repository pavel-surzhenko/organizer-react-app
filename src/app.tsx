// Core
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components';
import { LoginPage, SignUpPage, TasksPage } from './pages';

// Components

// Instruments

export const App: FC = () => {
    return (
        <>
            <Navigation />
            <main>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SignUpPage />} />
                    <Route path='/task-manager' element={<TasksPage />} />
                </Routes>
            </main>
        </>
    );
};
