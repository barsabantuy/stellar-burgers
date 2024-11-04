import React, {useEffect} from 'react';
import styles from './order-details.module.css';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../services/order-details-slice";

function OrderDetails() {

    const { bun, ingredients } = useSelector(store => store.burgerConstructor);
    const { order, loading, error } = useSelector(store => store.orderDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(createOrder([bun, ...ingredients, bun]));
    }, [dispatch, bun, ingredients]);

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (error) {
        return (
            <h1>Error!</h1>
        )
    }

    return (
        <section className={styles.details}>
            <h1 className={`${styles.counter} text text_type_digits-large mb-8`}>{order}</h1>
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
