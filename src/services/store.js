import { configureStore } from '@reduxjs/toolkit';
import burgerIngredientsReducer from './burger-ingredients-slice';
import ingredientDetailsSlice from "./ingredient-details-slice";
import burgerConstructorSlice from "./burger-constructor-slice";
import orderDetailsSlice from "./order-details-slice";

const store = configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        ingredientDetails: ingredientDetailsSlice,
        burgerConstructor: burgerConstructorSlice,
        orderDetails: orderDetailsSlice
    },
});

export default store;
