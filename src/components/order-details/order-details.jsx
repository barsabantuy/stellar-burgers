import React from 'react';
import styles from './order-details.module.css';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function OrderDetails() {

    return (
        <section className={styles.details}>
            <h1 className={`${styles.counter} text text_type_digits-large mb-8`}>034536</h1>
            <p className="text text_type_main-medium">Идентификатор заказа</p>
            <div className={styles.doneIcon}>
                <CheckMarkIcon type="primary" />
            </div>
            <p className="text text_type_main-default mb-1">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </section>
    );
}

export default OrderDetails;
