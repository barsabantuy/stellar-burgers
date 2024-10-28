import React, {useState} from 'react';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor(props) {

    const [ isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const ingredients = props.ingredients && props.ingredients.filter(item => item.type !== "bun");
    const bun = props.ingredients && props.ingredients.filter(item => item.type === "bun")[0];

    return (
        <div className={styles.container}>
            <div className={styles.topBun}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            {ingredients && <ul className={styles.itemList}>
                {ingredients.map(ingredient => {
                    return (
                        <li className={styles.item} key={ingredient._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                type={ingredient.type}
                                isLocked={false}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </li>
                    )
                })}
            </ul>}
            <div className={styles.bottomBun}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <section className={styles.order}>
                <span className="text text_type_digits-medium">
                    610
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
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

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
}

export default BurgerConstructor;
