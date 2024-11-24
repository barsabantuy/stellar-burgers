import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {postOrder} from "./api";
import {TOrder} from "../types";
import {UNKNOWN_ERROR} from "../utils";

export const createOrder = createAsyncThunk(
    'orderDetails/createOrder',
    async (ingredients: ReadonlyArray<string>) => {
        return postOrder(ingredients);
    }
);

interface IOrderDetailsState {
    name: string;
    order: number;
    loading: boolean;
    error: {} | string | null;
}

const initialState: IOrderDetailsState = {
    name: '',
    order: 0,
    loading: false,
    error: null
}

const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.name = '';
                state.order = 0;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
                state.loading = false;
                state.name = action.payload.name;
                state.order = action.payload.order.number;
                state.error = null;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.name = '';
                state.order = 0;
                state.error = action.payload || action.error.message || UNKNOWN_ERROR;
            });
    },
});

export default orderDetailsSlice.reducer;
