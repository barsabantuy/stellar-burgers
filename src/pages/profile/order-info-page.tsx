import React, {FC} from 'react';
import styles from './order-info-page.module.css'
import OrderInfo from "../../components/order/order-info";

const OrderInfoPage: FC = () => {

    return (
        <main className={styles.content}>
            <OrderInfo />
        </main>
    );
}

export default OrderInfoPage;
