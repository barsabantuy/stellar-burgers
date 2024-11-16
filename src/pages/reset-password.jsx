import React, {useCallback, useEffect, useState} from 'react';
import styles from './auth.module.css';
import commonStyles from './common.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../services/auth-slice';
import { resetPassword } from '../services/password-reset-slice';

function ResetPasswordPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const { user, loading: { getUser: userLoading } } = useSelector(store => store.auth);
    const { loading, tokenRequested } = useSelector(store => store.passwordReset);
    const [ form, setValue ] = useState({ password: '', token: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleResetPassword = useCallback(e => {
        e.preventDefault();
        if (!isEmptyForm) {
            dispatch(resetPassword(form));
        }
    }, [dispatch, form]);

    if (userLoading || loading.resetPassword) {
        return (
            <main className={styles.container}>
                <section className={styles.content}>
                    <h1>Загружаем...</h1>
                </section>
            </main>
        );
    }

    if (!tokenRequested || user) {
        return (
            <Navigate to='/' replace />
        );
    }

    const isEmptyForm = form.password === '' || form.token === '';

    return (
        <main className={styles.container}>
            <section className={styles.content}>
                <h1 className='text text_type_main-medium mb-3'>
                    Восстановление пароля
                </h1>
                <form onSubmit={handleResetPassword} className={styles.form}>
                    <PasswordInput
                        value={form.password}
                        onChange={onChange}
                        name={'password'}
                        placeholder='Введите новый пароль'
                        icon={'HideIcon'}
                        extraClass={styles.input}
                    />
                    <Input
                        value={form.token}
                        onChange={onChange}
                        name={'token'}
                        placeholder='Введите код из письма'
                        type={'text'}
                        extraClass={styles.input}
                    />
                    <Button onClick={handleResetPassword} htmlType='submit' type='primary' size='medium'
                            extraClass={styles.button} disabled={isEmptyForm}>
                        Сохранить
                    </Button>
                </form>
                <p className='text text_type_main-default text_color_inactive mb-3'>
                    Вспомнили пароль? <Link to='/login' className={commonStyles.plainLink}>Войти</Link>
                </p>
            </section>
        </main>
    );
}

export default ResetPasswordPage;
