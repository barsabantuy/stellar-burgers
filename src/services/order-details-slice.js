import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {postOrder} from "./api";

export const createOrder = createAsyncThunk(
    'orderDetails/createOrder',
    async (ingredients, thunkAPI) => {
        const response = await postOrder(ingredients);
        if (!response.ok) {
            return thunkAPI.rejectWithValue(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
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