import React from 'react';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function BurgerConstructor(props) {
    return (
        <div className={styles.container}>
            <div className={styles.topBun}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={props.top.name}
                    price={props.top.price}
                    thumbnail={props.top.image}
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
                    text={props.bottom.name}
                    price={props.bottom.price}
                    thumbnail={props.bottom.image}
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

const ingredientPropType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
})

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType),
    top: ingredientPropType,
    bottom: ingredientPropType,
}

export default BurgerConstructor;
