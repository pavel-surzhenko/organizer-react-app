import { useDispatch } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { authActions } from '../../lib/redux/actions';

export const Navigation: React.FC = () => {
    const isTaskManagerPage = useLocation().pathname === '/task-manager';
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = async () => {
        const error = await api.auth.logout();
        if (error) {
            dispatch(authActions.setError(error.message));
        } else {
            navigate('/login');
            localStorage.removeItem('token');
        }
    };

    return (
        <nav>
            {!isTaskManagerPage && <NavLink to='/login'>Log in</NavLink>}
            <NavLink to='/task-manager'>To tasks</NavLink>
            {isTaskManagerPage && (
                <Link to='' onClick={logOut}>
                    Log out
                </Link>
            )}
        </nav>
    );
};
