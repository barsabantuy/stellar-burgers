import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { fetchIngredients } from './api';
import {UNKNOWN_ERROR} from "../utils";
import {TError, TIngredient} from "../types";

export const fetchBurgerIngredients = createAsyncThunk(
    'burgerIngredients/fetchBurgerIngredients', fetchIngredients
);

interface IBurgerIngredientsState {
    isModalOpen: boolean;
    ingredients: TIngredient[],
    activeSection: string,
    loading: boolean,
    error: TError,
}

const initialState: IBurgerIngredientsState = {
    isModalOpen: false,
    ingredients: [],
    activeSection: 'bun',
    loading: false,
    error: null,
}

const burgerIngredientsSlice = createSlice({
    name: 'burgerIngredients',
    initialState,
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
            .addCase(fetchBurgerIngredients.fulfilled, (state, action: PayloadAction<{ data: TIngredient[] }>) => {
                state.loading = false;
                state.ingredients = action.payload.data;
            })
            .addCase(fetchBurgerIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || UNKNOWN_ERROR;
            });
    },
});

export const { actions: burgerIngredientsActions } = burgerIngredientsSlice;
export default burgerIngredientsSlice.reducer;
