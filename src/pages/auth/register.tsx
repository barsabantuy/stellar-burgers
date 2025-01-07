import React, { FC, FormEvent, useCallback } from 'react';
import styles from './auth.module.css';
import commonStyle from '../common.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { register } from '../../services/auth-slice';
import useForm from "../../hooks/useForm";
import {useAppDispatch, useAppSelector} from "../../hooks";

const RegistrationPage: FC = () => {

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(store => store.auth);

    const { form, handleChange } = useForm({ name: '', email: '', password: '' });

    const inputRef = React.useRef<HTMLInputElement>(null)

    const onIconClick = () => {
        inputRef?.current?.focus();
    }

    const handleRegister = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isEmptyForm) {
            dispatch(register(form));
        }
    }, [dispatch, form]);

    if (loading.register) {
        return (
            <main className={styles.container}>
                <section className={styles.content}>
                    <h1 className='text text_type_main-medium mb-3'>Регистрируем...</h1>
                </section>
            </main>
        )
    }

    const isEmptyForm = form.name === '' || form.email === '' || form.password === '';

    return (
        <main className={styles.container}>
            <section className={styles.content}>
                <h1 className='text text_type_main-medium mb-3'>
                    Регистрация
                </h1>
                <form onSubmit={handleRegister} className={styles.form}>
                    <Input
                        value={form.name}
                        onChange={handleChange}
                        extraClass={styles.input}
                        placeholder={'Имя'}
                        type={'text'}
                        name={'name'}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
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
                    <Button htmlType='submit' type='primary' size='medium'
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
