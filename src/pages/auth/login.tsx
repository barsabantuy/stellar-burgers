import React, { FC, FormEvent, useCallback } from 'react';
import styles from './auth.module.css';
import commonStyles from '../common.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { login } from '../../services/auth-slice';
import useForm from "../../hooks/useForm";
import {useAppDispatch, useAppSelector} from "../../hooks";

const LoginPage: FC = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();

    const { user, loading } = useAppSelector(store => store.auth);
    const { form, handleChange } = useForm({ email: '', password: '' });

    const isEmptyForm = form.email === '' || form.password === '';

    const handleLogin = useCallback((e: FormEvent<HTMLFormElement>) => {
        console.log('handleLogin');
        e.preventDefault();
        if (!isEmptyForm) {
            dispatch(login(form));
        }
    }, [dispatch, form, isEmptyForm]);

    if (loading.login) {
        console.log('loading login');
        return (
            <main className={styles.container}>
                <h1 className='text text_type_main-medium mb-3'>Входим...</h1>
            </main>
        )
    }

    if (user) {
        const from = location.state?.from?.pathname || '/';
        console.log(`okay, let's go to ${from}`);
        return (
            <Navigate to={from} replace />
        );
    }

    return (
        <main className={styles.container}>
            <section className={styles.content}>
                <h1 className='text text_type_main-medium mb-3'>
                    Вход
                </h1>
                <form onSubmit={handleLogin} className={styles.form}>
                    <EmailInput
                        value={form.email}
                        onChange={handleChange}
                        extraClass={styles.input}
                        placeholder='E-mail'
                        name={'email'}
                    />
                    <PasswordInput
                        value={form.password}
                        onChange={handleChange}
                        extraClass={styles.input}
                        placeholder='Пароль'
                        name={'password'}
                        icon={'HideIcon'}
                    />
                    <Button disabled={isEmptyForm} htmlType='submit' type='primary' size='medium'
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
