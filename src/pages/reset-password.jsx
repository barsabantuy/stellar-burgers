import React, { useCallback, useState } from 'react';
import styles from './auth.module.css';
import commonStyles from './common.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../services/password-reset-slice';
import useForm from "../hooks/useForm";

function ResetPasswordPage() {

    const dispatch = useDispatch();

    const { loading, tokenRequested } = useSelector(store => store.passwordReset);
    const { form, handleChange } = useForm({ password: '', token: '' });

    const handleResetPassword = useCallback(e => {
        e.preventDefault();
        if (!isEmptyForm) {
            dispatch(resetPassword(form));
        }
    }, [dispatch, form]);

    if (loading.resetPassword) {
        return (
            <main className={styles.container}>
                <section className={styles.content}>
                    <h1>Сбрасываем пароль...</h1>
                </section>
            </main>
        );
    }

    if (!tokenRequested) {
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
                        onChange={handleChange}
                        name={'password'}
                        placeholder='Введите новый пароль'
                        icon={'HideIcon'}
                        extraClass={styles.input}
                    />
                    <Input
                        value={form.token}
                        onChange={handleChange}
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
