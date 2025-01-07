import {FC, useMemo} from "react";
import commonStyles from "../../pages/common.module.css";
import styles from "./orders-stat.module.css";
import {useAppSelector} from "../../hooks";
import {formatNumber} from "../../utils";

type TOrdersByStatus = {
    [status: string]: number[];
}

const MAX_ORDERS_COUNT = 10;

const OrdersStat: FC = () => {

    const {orders, total, totalToday} = useAppSelector(store => store.feed);

    const columnsByStatus = useMemo<TOrdersByStatus>(() => {
        const result: TOrdersByStatus = {};

        orders.forEach((order) => {
            const {status, number} = order;
            if (!result[status]) {
                result[status] = [];
            }
            result[status].push(number);
        });

        return result;
    }, [orders]);

    const renderColumn = (status: string) => {
        return (
            <ul className={`${styles.column} ${styles[status]}`}>
                {columnsByStatus[status].slice(0, MAX_ORDERS_COUNT).map(orderNumber => (
                    <li key={orderNumber} className="text text_type_digits-default">{orderNumber}</li>
                ))}
            </ul>
        )
    }

    return (
        <div className={styles.container}>
            <main className={styles.content}>
                <section className={styles.stats}>
                    <section className={styles.stats}>
                        {columnsByStatus['done'] ? (
                            <div className={styles.statusDetails}>
                                <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                                {renderColumn('done')}
                            </div>
                        ) : null}
                        {columnsByStatus['pending'] ? (
                            <div className={styles.statusDetails}>
                                <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                                {renderColumn('pending')}
                            </div>
                        ) : null}
                    </section>
                </section>
                <section>
                    <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
                    <span
                        className={`${commonStyles.counterShadow} text text_type_digits-large`}>{formatNumber(total)}</span>
                </section>
                <section>
                    <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
                    <span
                        className={`${commonStyles.counterShadow} text text_type_digits-large`}>{formatNumber(totalToday)}</span>
                </section>
            </main>
        </div>
    );
}

export default OrdersStat;
