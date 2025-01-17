import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import commonStyles from "../../pages/common.module.css";
import React, {FC} from "react";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {TIngredient} from "../../types";
import Price from "../price/price";

interface IIngredient {
    item: TIngredient;
    counter: number;
}

const Ingredient: FC<IIngredient> = ({ item, counter }) => {

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
            ref={drag}
            to={`/ingredients/${ingredientId}`}
            state={{ background: location }}
            className={commonStyles.link}
        >
            <div className={styles.item}>
                {counter && <Counter count={counter} size="default" extraClass="m-1"/>}
                <img src={item.image} alt={item.name}/>
                <Price price={item.price} />
                <h3 className="text text_type_main-small">
                    {item.name}
                </h3>
            </div>
        </Link>
    );
}

export default Ingredient;
