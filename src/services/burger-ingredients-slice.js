import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIngredients } from './api';

export const fetchBurgerIngredients = createAsyncThunk(
    'burgerIngredients/fetchBurgerIngredients',
    async () => {
        return fetchIngredients();
    }
);

const burgerIngredientsSlice = createSlice({
    name: 'burgerIngredients',
    initialState: {
        isModalOpen: false,
        ingredients: [],
        activeSection: 'bun',
        loading: false,
        error: null,
    },
    reducers: {
        setActiveSection: (state, action) => {
            state.activeSection = action.payload
        },
        openModal: state => {
            state.isModalOpen = true;
        },
        closeModal: state => {
            state.isModalOpen = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBurgerIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBurgerIngredients.fulfilled, (state, action) => {
                state.loading = false;
                state.ingredients = action.payload.data;
            })
            .addCase(fetchBurgerIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: burgerIngredientsActions } = burgerIngredientsSlice;
export default burgerIngredientsSlice.reducer;
