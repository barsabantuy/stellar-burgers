import React, { useCallback, useEffect, useState } from 'react';
import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileMenu from '../components/profile-menu/profile-menu';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../services/auth-slice';
import { Navigate } from 'react-router-dom';

function ProfilePage() {

    const dispatch = useDispatch();

    const { user } = useSelector(store => store.auth);

    const [ form, setValue ] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setValue({
                name: user.name || '',
                email: user.email || '',
                password: ''
            });
        }
    }, [user]);

    const handleUpdateUser = useCallback(e => {
        e.preventDefault();
        if (canSubmit) {
            dispatch(updateUser(form));
        }
    }, [dispatch, form]);

    const handleReset = useCallback(e => {
        e.preventDefault();
        if (user) {
            setValue({
                name: user.name || '',
                email: user.email || '',
                password: ''
            });
        }
    }, [user]);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    if (!user) {
        return (
            <Navigate to='/login' />
        );
    }

    const isEmptyForm = form.name === '' || form.email === '';
    const dataChanged = form.name !== user.name || form.email !== user.email;
    const passwordNotEmpty = form.password !== '';
    const canSubmit = !isEmptyForm && dataChanged && passwordNotEmpty;

    return (
        <main className={styles.container}>
            <section className={styles.content}>
                <aside className={styles.sidebar}>
                    <ProfileMenu />
                    <p className='text text_type_main-small text_color_inactive'>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </aside>
                <form onSubmit={handleUpdateUser} className={styles.form}>
                    <Input
                        value={form.name}
                        onChange={onChange}
                        extraClass={styles.input}
                        placeholder={'Имя'}
                        type={'text'}
                        name={'name'}
                        icon={'EditIcon'}
                        isIcon={true}
                    />
                    <EmailInput
                        value={form.email}
                        onChange={onChange}
                        extraClass={styles.input}
                        placeholder='E-mail'
                        name={'email'}
                        icon={'EditIcon'}
                        isIcon={true}
                    />
                    <PasswordInput
                        value={form.password}
                        onChange={onChange}
                        extraClass={styles.input}
                        placeholder='Пароль'
                        name={'password'}
                        icon={'EditIcon'}
                        isIcon={true}
                    />
                    {canSubmit &&
                        <div>
                            <Button onClick={handleUpdateUser} htmlType='submit' type='primary' size='medium'
                                    extraClass={styles.button}>
                                Сохранить
                            </Button>
                            <Button onClick={handleReset} htmlType='button' type='secondary' size='medium'
                                    extraClass={styles.button}>
                                Отмена
                            </Button>
                        </div>
                    }
                </form>
            </section>
        </main>
    );
}

export default ProfilePage;
