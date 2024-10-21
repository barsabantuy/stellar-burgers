import React from 'react';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/types";

function BurgerConstructor(props) {
    return (
        <div className={styles.container}>
            <div className={styles.topBun}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${props.bun.name} (верх)`}
                    price={props.bun.price}
                    thumbnail={props.bun.image}
                />
            </div>
            {props.ingredients && <ul className={styles.itemList}>
                {props.ingredients.map(ingredient => {
                    return (
                        <li className={styles.item} key={ingredient.id}>
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
                    text={`${props.bun.name} (низ)`}
                    price={props.bun.price}
                    thumbnail={props.bun.image}
                />
            </div>
            <section className={styles.order}>
                <span className="text text_type_digits-medium">
                    610
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </section>
        </div>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
    bun: ingredientPropType.isRequired
}

export default BurgerConstructor;
