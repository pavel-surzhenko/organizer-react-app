// Core
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components';
import { LoginPage, SignUpPage } from './pages';

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
                </Routes>
            </main>
        </>
    );
};
