import React, {FC, useEffect, useMemo} from 'react';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { burgerConstructorActions } from "../../services/burger-constructor-slice"
import {useDrop} from "react-dnd";
import ConstructorIngredient from "./constructor-ingredient";
import {createOrder} from "../../services/order-details-slice";
import {useLocation, useNavigate} from "react-router-dom";
import {getUser} from "../../services/auth-slice";
import {TIngredient, TIngredientItem} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks";

const BurgerConstructor: FC = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { user, loading: { getUser: userLoading } } = useAppSelector(store => store.auth);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const { isModalOpen, bun, ingredients } = useAppSelector(store => store.burgerConstructor);
    const { loading, error, order } = useAppSelector(store => store.orderDetails);

    const handleCreateOrder = () => {
        if (!userLoading && !user) {
            navigate("/login", { state: { from: location } });
        } else {
            if (canOrder) {
                dispatch(createOrder([bun._id, ...ingredients.map(ingredient => ingredient._id), bun._id]));
                openOrderModal();
            }
        }
    }

    const openOrderModal = () => {
        dispatch(burgerConstructorActions.openModal());
    }

    const closeModal = () => {
        dispatch(burgerConstructorActions.closeModal());
        if (!loading && !error && order) {
            dispatch(burgerConstructorActions.clearConstructor());
        }
    }

    const [, drop] = useDrop({
        accept: 'ingredient',
        drop: (item: TIngredientItem) => dispatch(burgerConstructorActions.addIngredient({ ...item })),
    });

    const totalPrice = useMemo(() => {
        const ingredientsPrice = ingredients ? (ingredients.reduce((acc: number, curr: TIngredient) => acc + curr.price, 0)) : 0;
        const bunsPrice = bun ? bun.price * 2 : 0;
        return ingredientsPrice + bunsPrice;
    }, [ingredients, bun]);

    if (!bun && (!ingredients || ingredients.length === 0)) {
        return (
            <section ref={drop} className={styles.emptyContainer}>
                <h1 className="text text_type_main-large mt-4 mb-4">Начните собирать бургер!</h1>
                <h2 className="text text_type_main-medium text_color_inactive mt-4 mb-4">Перенесите ингредиенты сюда</h2>
            </section>
        )
    }

    const canOrder = bun && (ingredients && ingredients.length !== 0);

    return (
        <div className={styles.container}>
            <div ref={drop}>
                {bun && <div className={styles.topBun}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>}
                {ingredients &&
                    <ul className={styles.itemList}>
                        {ingredients.map(((ingredient: TIngredientItem, index: number) => (
                            <li key={ingredient.uuid}>
                                <ConstructorIngredient item={ingredient} index={index} />
                            </li>
                            )
                        ))}
                    </ul>
                }
                {bun && <div className={styles.bottomBun}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>}
            </div>
            <section className={styles.order}>
                <span className="text text_type_digits-medium">
                    {totalPrice}
                    <CurrencyIcon type="primary" />
                </span>
                <Button disabled={!canOrder} htmlType="button" type="primary" size="medium" onClick={handleCreateOrder}>
                    Оформить заказ
                </Button>
            </section>
            {isModalOpen &&
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>}
        </div>
    );
}

export default BurgerConstructor;
