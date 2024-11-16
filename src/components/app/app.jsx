import React, { useEffect } from 'react';
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
import { useDispatch } from "react-redux";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";

function App() {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBurgerIngredients());
    }, [dispatch]);

    const background = location.state && location.state.background;

    const handleModalClose = () => {
        navigate(-1);
    };

    return (
        <>
            <AppHeader />
            <Routes location={background || location}>
                <Route path='/' element={<HomePage />} />
                <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />} />} />
                <Route path='/profile/orders' element={<ProtectedRouteElement element={<OrdersPage />} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
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
