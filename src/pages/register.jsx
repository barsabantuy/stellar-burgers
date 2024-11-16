import React, { useCallback, useEffect, useState } from 'react';
import styles from './auth.module.css';
import commonStyle from './common.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, getUser } from '../services/auth-slice';

function RegistrationPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const { user, loading } = useSelector(store => store.auth);
    const [ form, setValue ] = useState({ name: '', email: '', password: '' });

    const handleRegister = useCallback(e => {
        e.preventDefault();
        dispatch(register(form));
    }, [dispatch, form]);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    if (loading.getUser || loading.register) {
        return (
            <main className={styles.container}>
                <section className={styles.content}>
                    <h1 className='text text_type_main-medium mb-3'>Загружаю...</h1>
                </section>
            </main>
        )
    }

    if (user) {
        return (
            <Navigate to='/' replace />
        );
    }

    const isEmptyForm = form.email === '' || form.password === '' || form.password === '';

    return (
        <main className={styles.container}>
            <section className={styles.content}>
                <h1 className='text text_type_main-medium mb-3'>
                    Регистрация
                </h1>
                <form onSubmit={handleRegister} className={styles.form}>
                    <Input
                        value={form.name}
                        onChange={onChange}
                        extraClass={styles.input}
                        placeholder={'Имя'}
                        type={'text'}
                        name={'name'}
                    />
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
                    <Button onClick={handleRegister} htmlType='submit' type='primary' size='medium'
                            extraClass={styles.button} disabled={isEmptyForm}>
                        Зарегистрироваться
                    </Button>
                </form>
                <p className='text text_type_main-default text_color_inactive mb-3'>
                    Уже зарегистрированы? <Link to='/login' className={commonStyle.plainLink}>Войти</Link>
                </p>
            </section>
        </main>
    );
}

export default RegistrationPage;
