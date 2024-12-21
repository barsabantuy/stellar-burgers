import { Middleware } from '@reduxjs/toolkit';
import {
    connect,
    connected,
    disconnect,
    disconnected,
    connectionError,
    messageReceived,
} from '../services/web-socket-slice';

let socket: WebSocket | null = null;

export const websocketMiddleware: Middleware = store => next => action => {
    if (connect.match(action)) {
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
            store.dispatch(connected());
        };

        socket.onmessage = (event) => {
            store.dispatch(messageReceived(JSON.parse(event.data)));
        };

        socket.onerror = (err) => {
            store.dispatch(connectionError('WebSocket error occurred'));
        };

        socket.onclose = () => {
            store.dispatch(disconnected());
        };
    }

    if (disconnect.match(action)) {
        if (socket) {
            socket.close();
            socket = null;
        }
    }

    return next(action);
};
