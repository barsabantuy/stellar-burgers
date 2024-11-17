import styles from "./profile-menu.module.css";
import { NavLink } from "react-router-dom";
import commonStyles from "../../pages/common.module.css";
import React from "react";

function ProfileMenu() {

    return (
        <nav className={styles.menu}>
            <ul className={styles.menuList}>
                <li className={styles.menuItem}>
                    <NavLink to='/profile' end className={commonStyles.link}>
                        {({isActive}) => (
                            <span className={`text text_type_main-medium ${isActive ? '' : 'text_color_inactive'}`}>
                                Профиль
                            </span>)}
                    </NavLink>
                </li>
                <li className={styles.menuItem}>
                    <NavLink to='/profile/orders' className={commonStyles.link}>
                        {({isActive}) => (
                            <span className={`text text_type_main-medium ${isActive ? '' : 'text_color_inactive'}`}>
                                История заказов
                            </span>)}
                    </NavLink>
                </li>
                <li className={styles.menuItem}>
                    <NavLink to='/logout' className={commonStyles.link}>
                        {({isActive}) => (
                            <span className={`text text_type_main-medium ${isActive ? '' : 'text_color_inactive'}`}>
                                Выход
                            </span>)}
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default ProfileMenu;
