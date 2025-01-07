import { Middleware } from '@reduxjs/toolkit';
import {
    connectUserOrders,
    connectedUserOrders,
    disconnectUserOrders,
    disconnectedUserOrders,
    connectionUserOrdersError,
    messageUserOrdersReceived,
} from '../services/user-orders-slice';

let socket: WebSocket | null = null;

export const userOrdersWebsocketMiddleware: Middleware = store => next => action => {
    if (connectUserOrders.match(action)) {
        if (socket) {
            socket.close();
        }

        const url = action.payload;
        const token = (localStorage.getItem('accessToken') || '').substring('Bearer '.length);

        if (token) {
            socket = new WebSocket(`${url}?token=${token}`);
        } else {
            socket = new WebSocket(url);
        }

        socket.onopen = () => {
            store.dispatch(connectedUserOrders());
        };

        socket.onmessage = (event) => {
            store.dispatch(messageUserOrdersReceived(JSON.parse(event.data)));
        };

        socket.onerror = (err) => {
            store.dispatch(connectionUserOrdersError('WebSocket error occurred'));
        };

        socket.onclose = () => {
            store.dispatch(disconnectedUserOrders());
        };
    }

    if (disconnectUserOrders.match(action)) {
        if (socket) {
            socket.close();
            socket = null;
        }
    }

    return next(action);
};
