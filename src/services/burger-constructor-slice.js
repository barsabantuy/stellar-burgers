import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        bun: null,
        ingredients: [],
        isModalOpen: false
    },
    reducers: {
        setBun: (state, action) => {
            state.bun = action.payload;
        },
        moveItem: (state, action) => {
            const { fromIndex, toIndex } = action.payload;
            const [movedItem] = state.ingredients.splice(fromIndex, 1);
            state.ingredients.splice(toIndex, 0, movedItem);
        },
        addIngredient: (state, action) => {
            const { index, item } = action.payload;
            const itemWithId = { ...item, uuid: uuidv4() };
            if (item.type === 'bun') {
                state.bun = itemWithId;
            } else {
                state.ingredients.splice(index, 0, itemWithId);
            }
        },
        removeIngredient: (state, action) => {
            const { uuid } = action.payload;
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
        }
    },
});

export const { actions: burgerConstructorActions } = burgerConstructorSlice;
export default burgerConstructorSlice.reducer;