import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = () => {
    return (
        <nav>
            <NavLink to='/login'>Log in</NavLink>
            <NavLink to='/task-manager'>To tasks</NavLink>
            <NavLink to='/profile'>Profile</NavLink>
        </nav>
    );
};

