import React, {FC} from "react";
import styles from "./feed.module.css";
import commonStyles from "../../pages/common.module.css";
import OrderItem from "../order/order-item";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "../../hooks";

const Feed: FC = () => {

    const location = useLocation();
    const { isConnected, orders } = useAppSelector(store => store.feed);

    if (!isConnected || !orders) {
        return (
            <section className={styles.loading}>
                <h1 className='text text_type_main-medium mb-3'>Загружаю...</h1>
            </section>
        )
    }

    return (
        <section className={styles.container}>
            <h1 className="text text_type_main-large">Лента заказов</h1>
            <ul className={styles.orderList}>
                {orders.map(order => (
                    <li className={styles.orderItem}>
                        <Link
                            to={`/feed/${order.number}`}
                            className={commonStyles.link}
                            state={{background: location}}
                        >
                            <li key={order._id}>
                                <OrderItem order={order}/>
                            </li>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Feed;
