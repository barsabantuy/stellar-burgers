import React from 'react';
import styles from './burger-ingredients.module.css';
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function BurgerIngredients(props) {
    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            <section className={styles.tabPanel}>
                {props.buns && <Tab value="one" active={true}>
                    Булки
                </Tab>}
                {props.sauces && <Tab value="two" active={false}>
                    Соусы
                </Tab>}
                {props.mains && <Tab value="three" active={false}>
                    Начинки
                </Tab>}
            </section>
            <article className={styles.article}>
                {props.buns && <section className={styles.ingredients}>
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <ul className={styles.itemList}>
                        {props.buns.map(bun => {
                            return (
                                <li className={styles.item} key={bun.id}>
                                    <Counter count={1} size="default" extraClass="m-1" />
                                    <img src={bun.image} alt={bun.name}/>
                                    <div className={styles.price}>
                                        <p className="text text_type_digits-default">
                                            {bun.price}
                                        </p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <h3 className="text text_type_main-small">
                                        {bun.name}
                                    </h3>
                                </li>
                            );
                        })}
                    </ul>
                </section>}
                {props.sauces && <section className={styles.ingredients}>
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <ul className={styles.itemList}>
                        {props.sauces.map(sauce => {
                            return (
                                <li className={styles.item} key={sauce.id}>
                                    <Counter count={1} size="default" extraClass="m-1" />
                                    <img src={sauce.image} alt={sauce.name}/>
                                    <div className={styles.price}>
                                        <p className="text text_type_digits-default">
                                            {sauce.price}
                                        </p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <h3 className="text text_type_main-small">
                                        {sauce.name}
                                    </h3>
                                </li>
                            );
                        })}
                    </ul>
                </section>}
                {props.mains && <section className={styles.ingredients}>
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <ul className={styles.itemList}>
                        {props.mains.map(main => {
                            return (
                                <li className={styles.item} key={main.id}>
                                    <img src={main.image} alt={main.name}/>
                                    <div className={styles.price}>
                                        <p className="text text_type_digits-default">
                                            {main.price}
                                        </p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <h3 className="text text_type_main-small">
                                        {main.name}
                                    </h3>
                                </li>
                            );
                        })}
                    </ul>
                </section>}
            </article>
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

BurgerIngredients.propTypes = {
    buns: PropTypes.arrayOf(ingredientPropType),
    sauces: PropTypes.arrayOf(ingredientPropType),
    mains: PropTypes.arrayOf(ingredientPropType),
}

export default BurgerIngredients;