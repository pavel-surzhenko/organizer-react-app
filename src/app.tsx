// Core
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components';
import { LoginPage } from './pages';

// Components


// Instruments

export const App: FC = () => {
    return (
        <>
            <Navigation />
            <main>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                </Routes>
            </main>
        </>
    );
};
