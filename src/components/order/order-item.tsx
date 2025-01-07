import React, {FC, useMemo} from "react";
import commonStyles from "../../pages/common.module.css";
import styles from "./order-item.module.css";
import Price from "../price/price";
import {TIngredient, TOrder} from "../../types";
import {useAppSelector} from "../../hooks";
import {countTotalPrice, formatDate, ORDER_STATUS} from "../../utils";

interface IOrderItem {
    order: TOrder;
    maxVisibleItems?: number;
    withStatus?: boolean;
}

const OrderItem: FC<IOrderItem> = ({ order, maxVisibleItems = 5, withStatus = false }) => {

    const { ingredients: allIngredients } = useAppSelector(store => store.burgerIngredients);

    const totalPrice = useMemo(() => {
        if (!allIngredients || !order?.ingredients) {
            return 0;
        }

        return countTotalPrice(allIngredients, order?.ingredients);
    }, [allIngredients, order?.ingredients]);

    const ingredients: TIngredient[] = useMemo(() => {
        if (!allIngredients || !order?.ingredients) return [];
        return order.ingredients
            .map(id => allIngredients.find(ing => ing._id === id))
            .filter((ing): ing is TIngredient => ing !== undefined);
    }, [allIngredients, order?.ingredients]);

    const visibleItems = ingredients.slice(0, maxVisibleItems);
    const remainingCount = ingredients.length - maxVisibleItems;

    return (
        <section className={styles.orderContainer}>
            <header className={styles.orderHeader}>
                <span className="text text_type_digits-default">{`#${order.number}`}</span>
                <span className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</span>
            </header>
            <h3 className="text text_type_main-medium">{order.name}</h3>
            {withStatus &&
                <span className={`${styles.state} ${order.status === 'Выполнен' ? commonStyles.done : ''}
                        text text_type_main-default`}>
                    {ORDER_STATUS[order.status]}
                </span>}
            <main className={styles.content}>
                <ul className={styles.ingredientList}>
                    {visibleItems.map((item, index) => (
                        <li key={index} className={`${commonStyles.ingredient} ${styles.overlap}`}>
                            <img src={item.image} alt={order.name} />
                            {index === maxVisibleItems - 1 && remainingCount > 0 && (
                                <div className={styles.overlay}>
                                    <span className="text text_type_main-small">
                                        +{remainingCount}
                                    </span>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
                <Price price={totalPrice}/>
            </main>
        </section>
    )
}

export default OrderItem;
