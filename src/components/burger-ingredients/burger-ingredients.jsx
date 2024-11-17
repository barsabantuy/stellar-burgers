import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { burgerIngredientsActions } from "../../services/burger-ingredients-slice"
import { useInView } from "react-intersection-observer";
import Ingredient from "./ingredient";

function BurgerIngredients() {

    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);

    const [bunsInViewRef, bunsInView] = useInView({ threshold: 0.1 });
    const [saucesInViewRef, saucesInView] = useInView({ threshold: 0.1 });
    const [mainsInViewRef, mainsInView] = useInView({ threshold: 0.1 });
    const dispatch = useDispatch();

    const sections = [
        { name: 'Булки', id: 'bun', ref: bunsRef, refInView: bunsInViewRef },
        { name: 'Соусы', id: 'sauce', ref: saucesRef, refInView: saucesInViewRef },
        { name: 'Начинки', id: 'main', ref: mainsRef, refInView: mainsInViewRef }
    ];

    useEffect(() => {
        if (bunsInView) {
            dispatch(burgerIngredientsActions.setActiveSection('bun'));
        } else if (saucesInView) {
            dispatch(burgerIngredientsActions.setActiveSection('sauce'));
        } else if (mainsInView) {
            dispatch(burgerIngredientsActions.setActiveSection('main'));
        }
    }, [bunsInView, saucesInView, mainsInView, dispatch]);

    const setRefs = useCallback(
        (node, ref, inViewRef) => {
            ref.current = node;
            inViewRef(node);
        },[],
    );

    const {ingredients, activeSection } = useSelector(store => store.burgerIngredients);
    const { bun, ingredients: constructorIngredients } = useSelector(store => store.burgerConstructor);

    const usedIngredientsCounter = useMemo(() => {
        const counter = {};
        constructorIngredients.forEach(ingredient => {
            counter[ingredient._id] = (counter[ingredient._id] || 0) + 1;
        });
        if (bun) {
            counter[bun._id] = 2;
        }
        return counter;
    }, [bun, constructorIngredients]);

    const filterIngredientsByType = type => {
        return ingredients && ingredients.filter(item => item.type === type);
    }

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            <nav className={styles.tabPanel}>
                {sections.map(section => (
                    <Tab
                        value={section.id}
                        active={activeSection === section.id}
                        key={section.id}
                        onClick={() => section.ref.current.scrollIntoView({ behavior: 'smooth' })}
                    >
                        {section.name}
                    </Tab>
                ))}
            </nav>

            <div className={styles.article}>
                {sections.map(section => (
                    <section className={styles.ingredients} id={section.id}
                             ref={el => setRefs(el, section.ref, section.refInView)}
                             key={section.id}>
                        <h2 className="text text_type_main-medium">{section.name}</h2>
                        <ul className={styles.itemList}>
                            {filterIngredientsByType(section.id).map(item => (
                                <li key={item._id}>
                                    <Ingredient item={item} counter={usedIngredientsCounter[item._id]} />
                                </li>
                            ))}
                        </ul>
                    </section>
                    ))}
            </div>
        </div>
    );
}

export default BurgerIngredients;