import React, { FC, useEffect } from 'react';
import styles from './auth.module.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth-slice';
import {useAppDispatch, useAppSelector} from "../../hooks";

const LogoutPage: FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, loading } = useAppSelector(store => store.auth);

    useEffect(() => {
        dispatch(logout());
    }, []);

    useEffect(() => {
        if (!loading.logout && !user) {
            navigate('/login', { replace: true });
        }
    }, [loading, user, navigate]);

    if (loading.logout && user) {
        return (
            <main className={styles.container}>
                <h1 className='text text_type_main-medium mb-3'>Выходим...</h1>
            </main>
        );
    }

    return null;
}

export default LogoutPage;
