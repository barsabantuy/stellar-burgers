import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {TFeedResponse, TOrder} from "../types";

interface WebSocketState {
    isConnected: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
    error?: string;
}

const initialState: WebSocketState = {
    isConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: undefined,
};

const webSocketSlice = createSlice({
    name: 'webSocket',
    initialState,
    reducers: {
        connect: (state, action: PayloadAction<string>) => {},
        disconnect: (state) => {},
        connected: (state) => {
            state.isConnected = true;
            state.error = undefined;
        },
        disconnected: (state) => {
            state.isConnected = false;
            state.error = undefined;
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
        },
        connectionError: (state, action: PayloadAction<string>) => {
            state.isConnected = false;
            state.error = action.payload;
        },
        messageReceived: (state, action: PayloadAction<TFeedResponse>) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
    },
});

export const {
    connect,
    disconnect,
    connected,
    disconnected,
    connectionError,
    messageReceived
} = webSocketSlice.actions;

export default webSocketSlice.reducer;
