import React, { FC, FormEvent, useCallback } from 'react';
import styles from './auth.module.css';
import commonStyles from '../common.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { forgotPassword } from '../../services/password-reset-slice';
import useForm from "../../hooks/useForm";
import {useAppDispatch, useAppSelector} from "../../hooks";

const ForgotPasswordPage: FC = () => {

    const dispatch = useAppDispatch();

    const { loading, tokenRequested } = useAppSelector(store => store.passwordReset);
    const { form, handleChange } = useForm({ email: '' });

    const handleForgotPassword = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isEmptyForm) {
            dispatch(forgotPassword(form));
        }
    }, [dispatch, form]);

    if (loading.forgotPassword) {
        return (
            <main className={styles.container}>
                <section className={styles.content}>
                <h1>Отправляем код...</h1>
                </section>
            </main>
        );
    }

    if (tokenRequested) {
        return (
            <Navigate to='/reset-password' replace />
        )
    }

    const isEmptyForm = form.email === '';

    return (
        <main className={styles.container}>
            <section className={styles.content}>
                <h1 className='text text_type_main-medium mb-3'>
                    Восстановление пароля
                </h1>
                <form onSubmit={handleForgotPassword} className={styles.form}>
                    <EmailInput
                        value={form.email}
                        onChange={handleChange}
                        extraClass={styles.input}
                        placeholder='Укажите E-mail'
                        name={'email'}
                    />
                    <Button htmlType='submit' type='primary' size='medium'
                            extraClass={styles.button} disabled={isEmptyForm}>
                        Восстановить
                    </Button>
                </form>
                    <p className='text text_type_main-default text_color_inactive mb-3'>
                        Вспомнили пароль? <Link to='/login' className={commonStyles.plainLink}>Войти</Link>
                    </p>
            </section>
        </main>
    )
}

export default ForgotPasswordPage;
