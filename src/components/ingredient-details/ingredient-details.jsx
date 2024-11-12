import React from 'react';
import styles from './ingredient-details.module.css';
import {useSelector} from "react-redux";

function IngredientDetails() {

    const { currentIngredient: ingredient } = useSelector(store => store.ingredientDetails);

    return (
        <section className={styles.details}>
            <img src={ingredient.image_large} alt={ingredient.name} className={styles.image}/>
            <h1 className="text text_type_main-medium mt-4">{ingredient.name}</h1>
            <ul className={styles.nutrients}>
                <li className={styles.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                </li>
                <li className={styles.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                </li>
                <li className={styles.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                </li>
                <li className={styles.nutrient}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </section>
    );
}

export default IngredientDetails;