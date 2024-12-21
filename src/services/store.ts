import { configureStore } from '@reduxjs/toolkit';
import burgerIngredientsReducer from './burger-ingredients-slice';
import burgerConstructorSlice from "./burger-constructor-slice";
import orderDetailsSlice from "./order-details-slice";
import authSlice from "./auth-slice";
import passwordResetSlice from "./password-reset-slice";
import webSocketReducer from "./web-socket-slice";
import orderInfoReducer from "./order-info-slice";
import {websocketMiddleware} from "../middleware/websocket-middleware";

const store = configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructorSlice,
        orderDetails: orderDetailsSlice,
        auth: authSlice,
        passwordReset: passwordResetSlice,
        webSocket: webSocketReducer,
        orderInfo: orderInfoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(websocketMiddleware),
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
