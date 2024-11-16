import React, {useCallback, useEffect, useState} from 'react';
import styles from './auth.module.css';
import commonStyles from './common.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../services/auth-slice';
import { forgotPassword } from '../services/password-reset-slice';

function ForgotPasswordPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const { user, loading: { getUser: userLoading } } = useSelector(store => store.auth);
    const { loading, tokenRequested } = useSelector(store => store.passwordReset);
    const [ form, setValue ] = useState({ email: '' });

    const handleForgotPassword = useCallback(e => {
        e.preventDefault();
        if (!isEmptyForm) {
            dispatch(forgotPassword(form));
        }
    }, [dispatch, form]);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    if (userLoading || loading.forgotPassword) {
        return (
            <main className={styles.container}>
                <section className={styles.content}>
                <h1>Загружаем...</h1>
                </section>
            </main>
        );
    }

    if (user) {
        return (
            <Navigate to='/' replace />
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
                        onChange={onChange}
                        extraClass={styles.input}
                        placeholder='Укажите E-mail'
                        name={'email'}
                    />
                    <Button onClick={handleForgotPassword} htmlType='submit' type='primary' size='medium'
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
