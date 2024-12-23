import React, {FC, useEffect} from 'react';
import styles from './feed.module.css';
import OrdersStat from "../../components/orders-stat/orders-stat";
import Feed from "../../components/feed/feed";
import {useAppDispatch} from "../../hooks";
import {connectFeed, disconnectFeed} from "../../services/feed-slice";
import {FEED_WEBSOCKET_URL} from "../../services/api";

const FeedPage: FC = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(connectFeed(FEED_WEBSOCKET_URL));

        return () => {
            dispatch(disconnectFeed());
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
