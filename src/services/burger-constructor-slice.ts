import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TIngredientItem } from "../types";

interface IBurgerConstructorState {
    bun: TIngredient | null;
    ingredients: TIngredientItem[];
    isModalOpen: boolean;
}

const initialState: IBurgerConstructorState = {
    bun: null,
    ingredients: [],
    isModalOpen: false
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addIngredient: {
            reducer: (state, action: PayloadAction<{ item: TIngredientItem, index: number }>) => {
                const {item, index} = action.payload;
                if (item.type === 'bun') {
                    state.bun = item;
                } else {
                    state.ingredients.splice(index, 0, item);
                }
            },
            prepare: (item: TIngredientItem, index: number = 0) => {
                return { payload: { index, item: { ...item, uuid: nanoid() } } };
            }
        },
        moveItem: (state, action: PayloadAction<{ fromIndex: number, toIndex: number }>) => {
            const { fromIndex, toIndex } = action.payload;
            const [ movedItem ] = state.ingredients.splice(fromIndex, 1);
            state.ingredients.splice(toIndex, 0, movedItem);
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            const uuid = action.payload;
            const index = state.ingredients.findIndex(ingredient => ingredient.uuid === uuid);
            if (index !== -1) {
                state.ingredients.splice(index, 1);
            }
        },
        openModal: state => {
            state.isModalOpen = true;
        },
        closeModal: state => {
            state.isModalOpen = false;
        },
        clearConstructor: state => {
            state.bun = null;
            state.ingredients = [];
        }
    },
});

export const { actions: burgerConstructorActions } = burgerConstructorSlice;
export default burgerConstructorSlice.reducer;
