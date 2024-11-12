import { createSlice, nanoid } from '@reduxjs/toolkit';

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        bun: null,
        ingredients: [],
        isModalOpen: false
    },
    reducers: {
        addIngredient: {
            reducer: (state, action) => {
                const {item, index} = action.payload;
                if (item.type === 'bun') {
                    state.bun = item;
                } else {
                    state.ingredients.splice(index, 0, item);
                }
            },
            prepare: (item, index = 0) => {
                return { payload: { index, item: { ...item, uuid: nanoid() } } };
            }
        },
        moveItem: (state, action) => {
            const { fromIndex, toIndex } = action.payload;
            const [movedItem] = state.ingredients.splice(fromIndex, 1);
            state.ingredients.splice(toIndex, 0, movedItem);
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
        },
        clearConstructor: state => {
            state.bun = null;
            state.ingredients = [];
        }
    },
});

export const { actions: burgerConstructorActions } = burgerConstructorSlice;
export default burgerConstructorSlice.reducer;