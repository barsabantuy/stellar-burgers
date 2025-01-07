import { Middleware } from '@reduxjs/toolkit';
import {
    connectFeed,
    connectedFeed,
    disconnectFeed,
    disconnectedFeed,
    connectionFeedError,
    messageFeedReceived,
} from '../services/feed-slice';

let socket: WebSocket | null = null;

export const feedWebsocketMiddleware: Middleware = store => next => action => {
    if (connectFeed.match(action)) {
        if (socket) {
            socket.close();
        }

        const url = action.payload;

        socket = new WebSocket(url);

        socket.onopen = () => {
            store.dispatch(connectedFeed());
        };

        socket.onmessage = (event) => {
            store.dispatch(messageFeedReceived(JSON.parse(event.data)));
        };

        socket.onerror = (err) => {
            store.dispatch(connectionFeedError('WebSocket error occurred'));
        };

        socket.onclose = () => {
            store.dispatch(disconnectedFeed());
        };
    }

    if (disconnectFeed.match(action)) {
        if (socket) {
            socket.close();
            socket = null;
        }
    }

    return next(action);
};
