import styles from "./price.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";

const Price: FC<{ price: number | string }> = ({ price }) => {

    return (
        <div className={styles.price}>
            <p className="text text_type_digits-default">
                {price}
            </p>
            <CurrencyIcon type="primary"/>
        </div>
    )
}

export default Price;
