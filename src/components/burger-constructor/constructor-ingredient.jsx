import React, {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import { burgerConstructorActions } from "../../services/burger-constructor-slice";
import styles from "./burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/types";

function ConstructorIngredient({ item, index }) {

    const dispatch = useDispatch();

    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'constructor-ingredient',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                dispatch(burgerConstructorActions.moveItem({ fromIndex: draggedItem.index, toIndex: index }));
                draggedItem.index = index;
            }
        },
    });

    const [, drag] = useDrag({
        type: 'constructor-ingredient',
        item: { index, originalIndex: index, uuid: item.uuid },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (draggedItem, monitor) => {
            if (!monitor.didDrop()) {
                dispatch(burgerConstructorActions.moveItem({ fromIndex: draggedItem.index, toIndex: draggedItem.originalIndex }));
            }
        }
    });

    drag(drop(ref));

    const handleClose = () => {
        dispatch(burgerConstructorActions.removeIngredient({ uuid: item.uuid }));
    }

    return (
        <div ref={ref} className={styles.item} >
            <DragIcon type="primary" />
            <ConstructorElement
                handleClose={handleClose}
                type={item.type}
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </div>
    );
}

ConstructorIngredient.propTypes = {
    index: PropTypes.number.isRequired,
    item: ingredientPropType.isRequired,
};

export default ConstructorIngredient;
