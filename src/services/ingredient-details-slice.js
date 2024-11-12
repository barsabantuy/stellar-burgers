import { createSlice } from '@reduxjs/toolkit';

const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState: {
        currentIngredient: null
    },
    reducers: {
        setCurrentIngredient: (state, action) => {
            state.currentIngredient = action.payload
        },
        cleanCurrentIngredient: (state) => {
            state.currentIngredient = null
        }
    }
});

export const { actions: ingredientDetailsActions } = ingredientDetailsSlice;
export default ingredientDetailsSlice.reducer;