import React, {FC, useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import { burgerConstructorActions } from "../../services/burger-constructor-slice";
import styles from "./burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredientItem} from "../../types";
import {useAppDispatch} from "../../hooks";

interface IConstructorIngredient {
    item: TIngredientItem;
    index: number;
}

const ConstructorIngredient: FC<IConstructorIngredient> = ({ item, index }) => {

    const dispatch = useAppDispatch();

    const ref = useRef(null);

    const [, drop] = useDrop<IConstructorIngredient>({
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
        dispatch(burgerConstructorActions.removeIngredient(item.uuid));
    }

    return (
        <div ref={ref} className={styles.item} >
            <DragIcon type="primary" />
            <ConstructorElement
                handleClose={handleClose}
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </div>
    );
}

export default ConstructorIngredient;
