import React, {FC, useEffect, useMemo} from 'react';
import styles from './orders-history.module.css';
import ProfileMenu from '../../components/profile/profile-menu';
import commonStyles from "../common.module.css";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {connectUserOrders, disconnectUserOrders} from "../../services/user-orders-slice";
import {USER_ORDERS_WEBSOCKET_URL} from "../../services/api";
import OrderItem from "../../components/order/order-item";

const OrdersHistoryPage: FC = () => {

    const location = useLocation();

    const dispatch = useAppDispatch();

    const { orders, isConnected } = useAppSelector(store => store.userOrders)

    useEffect(() => {
        dispatch(connectUserOrders(USER_ORDERS_WEBSOCKET_URL));

        return () => {
            dispatch(disconnectUserOrders());
        };
    }, [dispatch]);

    const sortedOrders = useMemo(() => {
        if (!orders) {
            return [];
        }
        return [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [orders]);

    if (!isConnected || !orders) {
        return (
            <main className={styles.container}>
                <section className={styles.content}>
                    <section className={styles.orders}>
                        <div className={styles.loading}>
                            <h1 className='text text_type_main-medium mb-3'>Загружаю...</h1>
                        </div>
                    </section>
                </section>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <section className={styles.content}>
                <aside className={styles.sidebar}>
                    <ProfileMenu/>
                    <p className='text text_type_main-small text_color_inactive'>
                        В этом разделе вы можете просмотреть свою историю заказов
                    </p>
                </aside>
                <section className={styles.orders}>
                    <ul className={styles.orderList}>
                        {sortedOrders.map(order => {
                            return (
                                <Link
                                    to={`${order.number}`}
                                    className={commonStyles.link}
                                    state={{ background: location }}
                                >
                                    <li key={order._id}>
                                        <OrderItem order={order} withStatus={true} maxVisibleItems={6} />
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                </section>
            </section>
        </main>
    );
}

export default OrdersHistoryPage;
