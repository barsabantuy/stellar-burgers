import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {postOrder} from "./api";
import { checkResponse } from '../utils';

export const createOrder = createAsyncThunk(
    'orderDetails/createOrder',
    async (ingredients, thunkAPI) => {
        return postOrder(ingredients)
            .then(checkResponse)
            .catch(error => thunkAPI.rejectWithValue(error.message));
    }
);

const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: {
        name: '',
        order: 0,
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.name = '';
                state.order = 0;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.name = action.payload.name;
                state.order = action.payload.order.number;
                state.error = null;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.name = '';
                state.order = 0;
                state.error = action.payload;
            });
    },
});

export default orderDetailsSlice.reducer;