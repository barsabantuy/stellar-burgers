import React, { FC, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import {
    ForgotPasswordPage,
    HomePage,
    LoginPage,
    LogoutPage,
    RegistrationPage,
    ResetPasswordPage,
    IngredientDetailsPage,
    ProfilePage,
    OrdersPage,
    NotFound404
} from "../../pages";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import AppHeader from "../app-header/app-header";
import { fetchBurgerIngredients } from "../../services/burger-ingredients-slice";
import ProtectedRoute from "../protected-route";
import type { Location } from "@remix-run/router";
import {useAppDispatch} from "../../hooks";

const App: FC = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchBurgerIngredients());
    }, [dispatch]);

    const background: Partial<Location> | string = location.state && location.state.background;

    const handleModalClose = () => {
        navigate(-1);
    };

    return (
        <>
            <AppHeader />
            <Routes location={background || location}>
                <Route path='/' element={<HomePage />} />
                <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} />
                <Route path='/profile/orders' element={<ProtectedRoute element={<OrdersPage />} />} />
                <Route path='/logout' element={<ProtectedRoute element={<LogoutPage />} />} />
                <Route path='/login' element={<ProtectedRoute anonymous={true} element={<LoginPage />} />} />
                <Route path='/register' element={<ProtectedRoute anonymous={true} element={<RegistrationPage />} />} />
                <Route path='/forgot-password' element={<ProtectedRoute anonymous={true} element={<ForgotPasswordPage />} />} />
                <Route path='/reset-password' element={<ProtectedRoute anonymous={true} element={<ResetPasswordPage />} />} />
                <Route path="/ingredients/:ingredientId" element={<IngredientDetailsPage />} />
                <Route path="*" element={<NotFound404 />} />
            </Routes>

            {background && (
                <Routes>
                    <Route
                        path='/ingredients/:ingredientId'
                        element={
                            <Modal onClose={handleModalClose}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
