import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchOrderRequest} from "./api";
import {TOrder} from "../types";
import {UNKNOWN_ERROR} from "../utils";

export const fetchOrder = createAsyncThunk(
    'orderInfo/fetchOrder',
    async (orderId: string) => {
        return fetchOrderRequest(orderId);
    }
);

interface IOrderInfoState {
    order: TOrder | null;
    loading: boolean;
    error: {} | string | null;
}

const initialState: IOrderInfoState = {
    order: null,
    loading: false,
    error: null
}

const orderInfoSlice = createSlice({
    name: 'orderInfo',
    initialState,
    reducers: {
        clearOrder: (state) => {
            state.order = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.loading = true;
                state.order = null;
                state.error = null;
            })
            .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<{ success: boolean, orders: TOrder[] }>) => {
                state.loading = false;
                state.order = action.payload.orders[0] || null;
                state.error = null;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.loading = false;
                state.order = null;
                state.error = action.payload || action.error.message || UNKNOWN_ERROR;
            });
    },
});

export const { actions: orderInfoActions } = orderInfoSlice;
export default orderInfoSlice.reducer;
