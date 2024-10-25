import React, {useState} from 'react';
import styles from './burger-ingredients.module.css';
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients(props) {

    const [ isModalOpen, setIsModalOpen] = useState(false);
    const [ currentItem, setCurrentItem] = useState(false);

    const openModal = (item) => () => {
        setCurrentItem(item);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const filterIngredientsByType = type => {
        return props.ingredients && props.ingredients.filter(item => item.type === type);
    }

    const buns = filterIngredientsByType("bun");
    const sauces = filterIngredientsByType("sauce");
    const mains = filterIngredientsByType("main");

    const getIngredientList = (items, name) => {
        return (
            <section className={styles.ingredients}>
                <h2 className="text text_type_main-medium">{name}</h2>
                <ul className={styles.itemList}>
                    {items.map(item => {
                        return (
                            <li className={styles.item} key={item._id} onClick={openModal(item)}>
                                <Counter count={1} size="default" extraClass="m-1" />
                                <img src={item.image} alt={item.name}/>
                                <div className={styles.price}>
                                    <p className="text text_type_digits-default">
                                        {item.price}
                                    </p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <h3 className="text text_type_main-small">
                                    {item.name}
                                </h3>
                            </li>
                        )
                    })}
                </ul>
            </section>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            <section className={styles.tabPanel}>
                {buns && <Tab value="one" active={true}>
                    Булки
                </Tab>}
                {sauces && <Tab value="two" active={false}>
                    Соусы
                </Tab>}
                {mains && <Tab value="three" active={false}>
                    Начинки
                </Tab>}
            </section>
            <article className={styles.article}>
                {buns && getIngredientList(buns, 'Булки')}
                {sauces && getIngredientList(sauces, 'Соусы')}
                {mains && getIngredientList(mains, 'Начинки')}
                {isModalOpen &&
                    <Modal onClose={closeModal} root={document.getElementById('app')}
                           title='Детали ингредиента'>
                        <IngredientDetails ingredient={currentItem} />
                    </Modal>}
            </article>
        </div>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default BurgerIngredients;