import { configureStore } from '@reduxjs/toolkit';
import burgerIngredientsReducer from './burger-ingredients-slice';
import burgerConstructorSlice from "./burger-constructor-slice";
import orderDetailsSlice from "./order-details-slice";
import authSlice from "./auth-slice";
import passwordResetSlice from "./password-reset-slice";

const store = configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructorSlice,
        orderDetails: orderDetailsSlice,
        auth: authSlice,
        passwordReset: passwordResetSlice
    },
});

export default store;
