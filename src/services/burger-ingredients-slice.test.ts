import burgerIngredientsReducer, {
    burgerIngredientsActions,
    fetchBurgerIngredients, initialState,
} from './burger-ingredients-slice';
import { UNKNOWN_ERROR } from '../utils';
import { TIngredient } from '../types';

describe('burgerIngredients slice', () => {
    it('should return the initial state on first run', () => {
        const result = burgerIngredientsReducer(undefined, { type: '' });
        expect(result).toEqual(initialState);
    });

    describe('reducers', () => {
        it('should handle setActiveSection', () => {
            const action = burgerIngredientsActions.setActiveSection('sauce');
            const state = burgerIngredientsReducer(initialState, action);

            expect(state.activeSection).toBe('sauce');
        });

        it('should handle openModal', () => {
            const action = burgerIngredientsActions.openModal();
            const state = burgerIngredientsReducer(initialState, action);

            expect(state.isModalOpen).toBe(true);
        });

        it('should handle closeModal', () => {
            const modifiedState = { ...initialState, isModalOpen: true };
            const action = burgerIngredientsActions.closeModal();
            const state = burgerIngredientsReducer(modifiedState, action);

            expect(state.isModalOpen).toBe(false);
        });
    });

    describe('fetchBurgerIngredients thunk', () => {
        it('should handle fetchBurgerIngredients.pending', () => {
            const action = { type: fetchBurgerIngredients.pending.type };
            const state = burgerIngredientsReducer(initialState, action);

            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should handle fetchBurgerIngredients.fulfilled', () => {
            const mockIngredients: TIngredient[] = [
                {
                    _id: '123',
                    name: 'Test Bun',
                    type: 'bun',
                    proteins: 10,
                    fat: 10,
                    carbohydrates: 10,
                    calories: 100,
                    price: 50,
                    image: 'test_bun.jpg',
                    image_mobile: 'test_bun_mobile.jpg',
                    image_large: 'test_bun_large.jpg',
                },
            ];

            const action = {
                type: fetchBurgerIngredients.fulfilled.type,
                payload: { data: mockIngredients },
            };

            const state = burgerIngredientsReducer(initialState, action);

            expect(state.loading).toBe(false);
            expect(state.ingredients).toEqual(mockIngredients);
            expect(state.error).toBeNull();
        });

        it('should handle fetchBurgerIngredients.rejected (with error payload)', () => {
            const errorMessage = 'Failed to fetch ingredients';
            const action = {
                type: fetchBurgerIngredients.rejected.type,
                payload: errorMessage,
                error: { message: errorMessage },
            };

            const state = burgerIngredientsReducer(initialState, action);

            expect(state.loading).toBe(false);
            expect(state.error).toBe(errorMessage);
        });

        it('should handle fetchBurgerIngredients.rejected (no payload)', () => {
            const action = {
                type: fetchBurgerIngredients.rejected.type,
                payload: undefined,
                error: { message: '' },
            };

            const state = burgerIngredientsReducer(initialState, action);

            expect(state.loading).toBe(false);
            expect(state.error).toBe(UNKNOWN_ERROR);
        });
    });
});
