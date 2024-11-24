import { Navigate, useLocation } from 'react-router-dom';
import React, {FC, useEffect} from 'react';
import { getUser } from '../../services/auth-slice';
import styles from '../../pages/common.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";

interface IProtectedRoute {
    element: React.ReactElement;
    anonymous?: boolean;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ element, anonymous = false }) => {

    const dispatch = useAppDispatch();
    const location = useLocation();

    const { user, loading } = useAppSelector(store => store.auth);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    if (loading.getUser) {
        return (
            <main className={styles.container}>
                <section className={styles.content}>
                    <h1 className='text text_type_main-medium mb-3'>Загружаю...</h1>
                </section>
            </main>
        )
    }

    const isLoggedIn = !loading.getUser && user;
    const from = location.state?.from || '/';

    if (anonymous && isLoggedIn) {
        return <Navigate to={ from } />;
    }

    if (!anonymous && !isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }}/>;
    }

    return element;
}

export default ProtectedRoute;
