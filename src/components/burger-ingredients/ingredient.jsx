import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import commonStyles from "../../pages/common.module.css";
import React from "react";
import {useDrag} from "react-dnd";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/types";
import {Link, useLocation} from "react-router-dom";

function Ingredient({ item, counter }) {

    const location = useLocation();
    const ingredientId = item['_id'];

    const [, drag] = useDrag({
        type: 'ingredient',
        item: { ...item },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <Link
            to={`/ingredients/${ingredientId}`}
            state={{ background: location }}
            className={commonStyles.link}
        >
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
        </Link>
    );
}

Ingredient.propTypes = {
    item: ingredientPropType.isRequired,
    counter: PropTypes.number
};

export default Ingredient;
