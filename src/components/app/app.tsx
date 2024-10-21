import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import data from '../../utils/data.js'

function App() {
    const ingredients = data.filter(item => item.type !== "bun");
    const buns = data.filter(item => item.type === "bun");
    const sauces = data.filter(item => item.type === "sauce");
    const mains = data.filter(item => item.type === "main");

    return (
        <div className={styles.appContainer}>
            <AppHeader />
            <main className={styles.mainContent}>
                <BurgerIngredients buns={buns} sauces={sauces} mains={mains} />
                <BurgerConstructor ingredients={ingredients} bun={buns[0]} />
            </main>
        </div>
    );
}

export default App;
