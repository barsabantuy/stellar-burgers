import React, { FC } from 'react';
import styles from './profile.module.css';
import ProfileMenu from '../components/profile-menu/profile-menu';

const OrdersPage: FC = () => {
    return (
        <main className={styles.container}>
            <section className={styles.content}>
                <aside className={styles.sidebar}>
                    <ProfileMenu />
                </aside>
            </section>
        </main>
    );
}

export default OrdersPage;
