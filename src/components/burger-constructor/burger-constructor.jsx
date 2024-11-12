import React, {useMemo} from 'react';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { burgerConstructorActions } from "../../services/burger-constructor-slice"
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import ConstructorIngredient from "./constructor-ingredient";
import {createOrder} from "../../services/order-details-slice";

function BurgerConstructor() {

    const { isModalOpen, bun, ingredients } = useSelector(store => store.burgerConstructor);
    const { loading, error, order } = useSelector(store => store.orderDetails);
    const dispatch = useDispatch();

    const handleCreateOrder = () => {
        dispatch(createOrder([bun, ...ingredients, bun]));
        openOrderModal();
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
        drop: (item) => dispatch(burgerConstructorActions.addIngredient({ ...item })),
    });

    const totalPrice = useMemo(() => {
        const ingredientsPrice = ingredients ? (ingredients.reduce((acc, curr) => acc + curr.price, 0)) : 0;
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
                        {ingredients.map(((ingredient, index) => (
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
                <Modal onClose={closeModal} root={document.getElementById('modals')}>
                    <OrderDetails />
                </Modal>}
        </div>
    );
}

export default BurgerConstructor;
