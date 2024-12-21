import React, {FC} from "react";
import styles from "./feed.module.css";
import commonStyles from "../../pages/common.module.css";
import OrderItem from "../order/order-item";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "../../hooks";

const Feed: FC = () => {

    const location = useLocation();
    const { isConnected, orders } = useAppSelector(store => store.webSocket);

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-large">Лента заказов</h1>
                {(!isConnected || !orders) ? (
                    <section className={styles.loading}>
                        <h1 className='text text_type_main-medium mb-3'>Загружаю...</h1>
                    </section>
                ) : (
                    <ul className={styles.orderList}>
                        {orders.map(order => {
                            return (
                                <Link
                                    to={`/feed/${order.number}`}
                                    className={commonStyles.link}
                                    state={{background: location}}
                                >
                                    <li key={order._id}>
                                        <OrderItem order={order}/>
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                )}
        </div>
    )
}

export default Feed;
