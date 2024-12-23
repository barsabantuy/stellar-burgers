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

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        connectFeed: (state, action: PayloadAction<string>) => {},
        disconnectFeed: (state) => {},
        connectedFeed: (state) => {
            state.isConnected = true;
            state.error = undefined;
        },
        disconnectedFeed: (state) => {
            state.isConnected = false;
            state.error = undefined;
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
        },
        connectionFeedError: (state, action: PayloadAction<string>) => {
            state.isConnected = false;
            state.error = action.payload;
        },
        messageFeedReceived: (state, action: PayloadAction<TFeedResponse>) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
    },
});

export const {
    connectFeed,
    disconnectFeed,
    connectedFeed,
    disconnectedFeed,
    connectionFeedError,
    messageFeedReceived
} = feedSlice.actions;

export default feedSlice.reducer;
