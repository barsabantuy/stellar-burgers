import React, {FC, FormEvent, SyntheticEvent, useCallback, useEffect} from 'react';
import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileMenu from '../components/profile/profile-menu';
import { updateUser } from '../services/auth-slice';
import useForm from "../hooks/useForm";
import {useAppDispatch, useAppSelector} from "../hooks";

const ProfilePage: FC = () => {

    const dispatch = useAppDispatch();

    const { user } = useAppSelector(store => store.auth);

    const { form, handleChange, setValue } = useForm({ name: '', email: '', password: '' });

    useEffect(() => {
        if (user) {
            setValue({
                name: user.name || '',
                email: user.email || '',
                password: ''
            });
        }
    }, [user]);

    const inputRef = React.useRef<HTMLInputElement>(null)

    const onIconClick = () => {
        inputRef?.current?.focus();
    }

    const handleUpdateUser = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (canSubmit) {
            dispatch(updateUser(form));
        }
    }, [dispatch, form]);

    const handleReset = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        if (user) {
            setValue({
                name: user.name || '',
                email: user.email || '',
                password: ''
            });
        }
    }, [user]);

    const isEmptyForm = form.name === '' || form.email === '';
    const dataChanged = form.name !== user?.name || form.email !== user?.email;
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
                        onChange={handleChange}
                        extraClass={styles.input}
                        placeholder={'Имя'}
                        type={'text'}
                        name={'name'}
                        icon={'EditIcon'}
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
                        isIcon={true}
                    />
                    <PasswordInput
                        value={form.password}
                        onChange={handleChange}
                        extraClass={styles.input}
                        placeholder='Пароль'
                        name={'password'}
                        icon={'EditIcon'}
                    />
                    {canSubmit &&
                        <div>
                            <Button htmlType='submit' type='primary' size='medium'
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
