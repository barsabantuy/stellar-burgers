import { configureStore } from '@reduxjs/toolkit';
import burgerIngredientsReducer from './burger-ingredients-slice';
import burgerConstructorSlice from "./burger-constructor-slice";
import orderDetailsSlice from "./order-details-slice";
import authSlice from "./auth-slice";
import passwordResetSlice from "./password-reset-slice";
import feedReducer from "./feed-slice";
import userOrdersReducer from "./user-orders-slice";
import orderInfoReducer from "./order-info-slice";
import {feedWebsocketMiddleware} from "../middleware/feed-websocket-middleware";
import {userOrdersWebsocketMiddleware} from "../middleware/user-orders-websocket-middleware";

const store = configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructorSlice,
        orderDetails: orderDetailsSlice,
        auth: authSlice,
        passwordReset: passwordResetSlice,
        feed: feedReducer,
        userOrders: userOrdersReducer,
        orderInfo: orderInfoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(feedWebsocketMiddleware).concat(userOrdersWebsocketMiddleware),
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
