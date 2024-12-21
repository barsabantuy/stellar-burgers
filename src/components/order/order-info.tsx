import React, {FC, useEffect, useMemo} from 'react';
import styles from './order-info.module.css'
import {useParams} from "react-router-dom";
import commonStyles from "../../pages/common.module.css";
import Price from "../price/price";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchOrder, orderInfoActions} from "../../services/order-info-slice";
import {fetchBurgerIngredients} from "../../services/burger-ingredients-slice";
import {countTotalPrice, formatDate, ORDER_STATUS} from "../../utils";

const OrderInfo: FC = () => {

    const dispatch = useAppDispatch();
    const { orderId } = useParams();
    const { order, loading } = useAppSelector(store => store.orderInfo);
    const { ingredients, loading: loadingIngredients } = useAppSelector(store => store.burgerIngredients);

    useEffect(() => {
        if (!ingredients && !loadingIngredients) {
            dispatch(fetchBurgerIngredients());
        }
    }, [dispatch, ingredients]);

    useEffect(() => {
        if (!order && !loading && orderId) {
            dispatch(fetchOrder(orderId));
        }
    }, [dispatch, orderId, order]);

    useEffect(() => {
        return () => {
            dispatch(orderInfoActions.clearOrder());
        }
    }, []);

    const totalPrice = useMemo(() => {
        if (!ingredients || !order?.ingredients) {
            return 0;
        }

        return countTotalPrice(ingredients, order?.ingredients);
    }, [ingredients, order?.ingredients]);

    if (loading || loadingIngredients) {
        return (
            <main className={styles.content}>
                <h1 className='text text_type_main-medium mb-3'>Загружаю...</h1>
            </main>
        )
    }

    if (order === null) {
        return (
            <main className={styles.content}>
                <h1 className='text text_type_main-medium mb-3'>Заказ не найден!</h1>
            </main>
        )
    }

    return (
        <main className={styles.content}>
            <span className={`${styles.orderNumber} text text_type_digits-default`}>
                {`#${order.number}`}
            </span>
            <header className={`${styles.header}`}>
                <h1 className="text text_type_main-medium mb-3">
                    {order.name}
                </h1>
                <span className={`${order.status === 'done' ? commonStyles.done : ''}
                    text text_type_main-default`}>
                {ORDER_STATUS[order.status]}
            </span>
            </header>
            <h2 className="text text_type_main-medium mb-6">Состав:</h2>
            <ul className={styles.list}>
                {order.ingredients.map(ingredientId => {
                    const ingredient = ingredients.find(ing => ing._id === ingredientId);
                    return (
                        <li className={styles.listItem}>
                            <div className={commonStyles.ingredient}>
                                <img src={`${ingredient?.image}`} alt=""  />
                            </div>
                            <h3 className={`${styles.ingredientName} text text_type_main-default`}>
                                {ingredient?.name}
                            </h3>
                            <Price price={`1 x ${ingredient?.price}`}/>
                        </li>
                    )
                })}
            </ul>
            <footer className={styles.footer}>
                <span className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</span>
                <Price price={totalPrice}/>
            </footer>
        </main>
    );
}

export default OrderInfo;
