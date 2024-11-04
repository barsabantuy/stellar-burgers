import React, {useEffect, useMemo} from 'react';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { burgerConstructorActions } from "../../services/burger-constructor-slice"
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import ConstructorIngredient from "./constructor-ingredient";

function BurgerConstructor() {

    const { isModalOpen, bun, ingredients } = useSelector(store => store.burgerConstructor);
    const { ingredients: burgerIngredients } = useSelector(store => store.burgerIngredients);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!bun) {
            const firstBun = burgerIngredients.filter(item => item.type === "bun")[0];
            dispatch(burgerConstructorActions.setBun(firstBun));
        }
    }, [bun, burgerIngredients, dispatch]);

    const openOrderModal = () => {
        dispatch(burgerConstructorActions.openModal());
    }

    const closeModal = () => {
        dispatch(burgerConstructorActions.closeModal());
    }

    const [, drop] = useDrop({
        accept: 'ingredient',
        drop: (item) => dispatch(burgerConstructorActions.addIngredient({ index: 0, item })),
    });

    const totalPrice = useMemo(() => {
        const ingredientsPrice = ingredients ? (ingredients.reduce((acc, curr) => acc + curr.price, 0)) : 0;
        const bunsPrice = bun ? bun.price * 2 : 0;
        return ingredientsPrice + bunsPrice;
    }, [ingredients, bun]);

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
                <Button htmlType="button" type="primary" size="medium" onClick={openOrderModal}>
                    Оформить заказ
                </Button>
            </section>
            {isModalOpen &&
                <Modal onClose={closeModal} root={document.getElementById('app')}>
                    <OrderDetails />
                </Modal>}
        </div>
    );
}

export default BurgerConstructor;
