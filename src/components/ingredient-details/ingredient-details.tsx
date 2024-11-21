import React, { FC } from 'react';
import styles from './ingredient-details.module.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../types";

const IngredientDetails: FC = () => {

    const { ingredientId } = useParams();

    // @ts-ignore
    const { ingredients, loading, error } = useSelector(store => store.burgerIngredients);

    if (loading) {
        return (
            <section className={styles.details}>
                <h1>Загружаем...</h1>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles.details}>
                <h1>Ошибка при загрузке ингредиента!</h1>
            </section>
        );
    }

    const ingredient = ingredients.find((item: TIngredient) => item._id === ingredientId);

    if (!ingredient) {
        return (
            <section className={styles.details}>
                <h1>Ингредиент не найден!</h1>
            </section>
        );
    }

    return (
        <section className={styles.details}>
            <header>
                <h2 className="text text_type_main-large mt-3 mb-1">Детали ингредиента</h2>
            </header>
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