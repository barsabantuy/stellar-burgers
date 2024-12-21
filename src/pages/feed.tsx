import React, {FC, useEffect} from 'react';
import styles from './feed.module.css';
import OrdersStat from "../components/orders-stat/orders-stat";
import Feed from "../components/feed/feed";
import {useAppDispatch} from "../hooks";
import {connect, disconnect} from "../services/web-socket-slice";
import {FEED_WEBSOCKET_URL} from "../services/api";

const FeedPage: FC = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(connect(FEED_WEBSOCKET_URL));

        return () => {
            dispatch(disconnect());
        };
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <main className={styles.content}>
                <Feed />
                <OrdersStat />
            </main>
        </div>
    );
}

export default FeedPage;
