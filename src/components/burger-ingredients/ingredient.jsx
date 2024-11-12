import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import React from "react";
import {useDrag} from "react-dnd";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/types";

function Ingredient({ item, counter }) {

    const [, drag] = useDrag({
        type: 'ingredient',
        item: { ...item },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} className={styles.item}>
            {counter && <Counter count={counter} size="default" extraClass="m-1"/>}
            <img src={item.image} alt={item.name}/>
            <div className={styles.price}>
                <p className="text text_type_digits-default">
                    {item.price}
                </p>
                <CurrencyIcon type="primary"/>
            </div>
            <h3 className="text text_type_main-small">
                {item.name}
            </h3>
        </div>
    );
}

Ingredient.propTypes = {
    item: ingredientPropType.isRequired,
    counter: PropTypes.number
};

export default Ingredient;
