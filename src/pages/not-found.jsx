import React from 'react';
import commonStyles from './common.module.css';
import styles from './not-found.module.css';

function NotFound404() {

    return (
        <main className={commonStyles.container}>
            <section className={commonStyles.content}>
                <h1 className={`${styles.title} text text_type_main-large`}>
                    Страница не найдена
                </h1>
                <p className='text text_type_main-medium mb-6'>'Не все, кто блуждают, потеряны'</p>
                <p className={`${styles.caption} text text_type_main-small`}>Дж. Р. Р. Толкин.</p>
            </section>
        </main>
    );
}

export default NotFound404;
