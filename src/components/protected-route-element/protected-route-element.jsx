import { Navigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/auth-slice';
import styles from '../../pages/common.module.css';

export function ProtectedRouteElement({ element }) {

    const dispatch = useDispatch();
    const location = useLocation();

    const { user, loading } = useSelector(store => store.auth);

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

    if (user) {
        return element;
    }

    return <Navigate to='/login' replace state={{ from: location }} />;
}
