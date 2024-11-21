import React from 'react';
import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";
import commonStyles from "../../pages/common.module.css";
import { FC } from "react";

const AppHeader: FC = () => {
    return (
        <div className={styles.container}>
            <header className={styles.appHeader}>
                <nav className={styles.leftNav}>
                    <ul className={styles.menu}>
                        <li>
                            <NavLink to='/' className={`${styles.item} ${commonStyles.link}`}>
                                {({isActive}) => (<>
                                    <BurgerIcon type="primary" />
                                    <span className={`text text_type_main-small ${!isActive ? 'text_color_inactive' : ''}`}>
                                        Конструктор
                                    </span>
                                </>)}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/feed' className={`${styles.item} ${commonStyles.link}`}>
                                {({isActive}) => (<>
                                    <ListIcon type="primary" />
                                    <span className={`text text_type_main-small ${!isActive ? 'text_color_inactive' : ''}`}>
                                        Лента заказов
                                    </span>
                                </>)}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className={styles.logoContainer}>
                    <Link to='/' className={commonStyles.link}>
                        <Logo />
                    </Link>
                </div>
                <nav className={styles.rightNav}>
                    <ul className={styles.menuRight}>
                        <li>
                            <NavLink to='/profile' className={`${styles.profile} ${commonStyles.link}`}>
                                {({isActive}) => (<>
                                    <ProfileIcon type="primary" />
                                    <span className={`text text_type_main-small ${!isActive ? 'text_color_inactive' : ''}`}>
                                        Личный кабинет
                                    </span>
                                </>)}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default AppHeader;
