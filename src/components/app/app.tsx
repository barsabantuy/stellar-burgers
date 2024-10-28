import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import DOMAIN from "../../utils/api";
import ErrorBoundary from "../error-boundary/error-boundary";

function App() {

    const [ items, setItems ] = useState();

    useEffect(() => {
        fetch(`${DOMAIN}/api/ingredients`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(({ data }) => setItems(data))
            .catch(error => console.log("unexpected error occurred", error));
    }, []);

    return (
        <div className={styles.appContainer} id='app'>
            <ErrorBoundary>
                <AppHeader />
                <main className={styles.mainContent}>
                    {items && (
                        <>
                            <BurgerIngredients ingredients={items} />
                            <BurgerConstructor ingredients={items} />
                        </>
                    )}
                </main>
            </ErrorBoundary>
        </div>
    );
}

export default App;
