import React, { useCallback, useEffect, useState } from 'react';
import styles from './auth.module.css';
import commonStyles from './common.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, login } from '../services/auth-slice';

function LoginPage() {

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const { user, loading } = useSelector(store => store.auth);
    const [ form, setValue ] = useState({ email: '', password: '' });

    const handleLogin = useCallback(e => {
        e.preventDefault();
        if (!isEmptyForm) {
            dispatch(login(form));
        }
    }, [dispatch, form]);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    if (loading.getUser || loading.login) {
        return (
            <main className={styles.container}>
                <h1 className='text text_type_main-medium mb-3'>Загружаю...</h1>
            </main>
        )
    }

    if (user) {
        const from = location.state?.from?.pathname || '/';
        return (
            <Navigate to={from} replace />
        );
    }

    const isEmptyForm = form.email === '' || form.password === '';

    return (
        <main className={styles.container}>
            <section className={styles.content}>
                <h1 className='text text_type_main-medium mb-3'>
                    Вход
                </h1>
                <form onSubmit={handleLogin} className={styles.form}>
                    <EmailInput
                        value={form.email}
                        onChange={onChange}
                        extraClass={styles.input}
                        placeholder='E-mail'
                        name={'email'}
                    />
                    <PasswordInput
                        value={form.password}
                        onChange={onChange}
                        extraClass={styles.input}
                        placeholder='Пароль'
                        name={'password'}
                        icon={'HideIcon'}
                    />
                    <Button onClick={handleLogin} disabled={isEmptyForm} htmlType='submit' type='primary' size='medium'
                            extraClass={styles.button}>
                        Вход
                    </Button>
                </form>
                <p className='text text_type_main-default text_color_inactive mb-3'>
                    Вы - новый пользователь? <Link to='/register' className={commonStyles.plainLink}>Зарегистрироваться</Link>
                </p>
                <p className='text text_type_main-default text_color_inactive'>
                    Забыли пароль? <Link to='/forgot-password' className={commonStyles.plainLink}>Восстановить пароль</Link>
                </p>
            </section>
        </main>
    );
}

export default LoginPage;
