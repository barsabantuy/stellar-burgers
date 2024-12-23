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

const userOrdersSlice = createSlice({
    name: 'userOrders',
    initialState,
    reducers: {
        connectUserOrders: (state, action: PayloadAction<string>) => {},
        disconnectUserOrders: (state) => {},
        connectedUserOrders: (state) => {
            state.isConnected = true;
            state.error = undefined;
        },
        disconnectedUserOrders: (state) => {
            state.isConnected = false;
            state.error = undefined;
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
        },
        connectionUserOrdersError: (state, action: PayloadAction<string>) => {
            state.isConnected = false;
            state.error = action.payload;
        },
        messageUserOrdersReceived: (state, action: PayloadAction<TFeedResponse>) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
    },
});

export const {
    connectUserOrders,
    disconnectUserOrders,
    connectedUserOrders,
    disconnectedUserOrders,
    connectionUserOrdersError,
    messageUserOrdersReceived
} = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
