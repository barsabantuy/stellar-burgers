import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import ErrorBoundary from "../error-boundary/error-boundary";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    return (
        <div className={styles.appContainer}>
            <ErrorBoundary>
                <AppHeader />
                <main className={styles.mainContent}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </main>
            </ErrorBoundary>
        </div>
    );
}

export default App;
