import React from 'react';
import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
    return (
        <div className={styles.container}>
            <header className={styles.appHeader}>
                <nav className={styles.leftNav}>
                    <ul className={styles.menu}>
                        <li className={styles.item}>
                            <BurgerIcon type="primary" />
                            <span className="text text_type_main-small">Конструктор</span>
                        </li>
                        <li className={styles.item}>
                            <ListIcon type="primary" />
                            <span className="text text_type_main-small text_color_inactive">Лента заказов</span>
                        </li>
                    </ul>
                </nav>
                <div className={styles.logoContainer}>
                    <Logo />
                </div>
                <nav className={styles.rightNav}>
                    <ul className={styles.menuRight}>
                        <li className={styles.profile}>
                            <ProfileIcon type="primary" />
                            <span className="text text_type_main-small text_color_inactive">Личный кабинет</span>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default AppHeader;