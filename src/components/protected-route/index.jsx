import { Navigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/auth-slice';
import styles from '../../pages/common.module.css';
import PropTypes from "prop-types";

function ProtectedRoute({ element, anonymous = false }) {

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

ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
    anonymous: PropTypes.bool
}

export default ProtectedRoute;
