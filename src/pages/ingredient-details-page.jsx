import React from 'react';
import styles from './common.module.css';

import IngredientDetails from '../components/ingredient-details/ingredient-details';

function ingredientDetailsPage() {
    return (
        <main className={styles.container}>
            <IngredientDetails></IngredientDetails>
        </main>
    );
}

export default ingredientDetailsPage;
