import burgerConstructorReducer, { burgerConstructorActions } from './burger-constructor-slice';
import { TIngredientItem } from '../types';

const TEST_UUID = 'test-uuid';

jest.mock('nanoid', () => ({
    nanoid: () => TEST_UUID,
}));

describe('burgerConstructor slice', () => {
    const mockBun: TIngredientItem = {
        _id: '1',
        name: 'Test Bun',
        type: 'bun',
        price: 10,
        image: 'test_bun_image.png',
        uuid: 'some-uuid',
    };

    const mockIngredient: TIngredientItem = {
        _id: '2',
        name: 'Test Salade',
        type: 'main',
        price: 20,
        image: 'test_salade_image.png',
        uuid: 'some-other-uuid',
    };

    it('should return the initial state when passed an empty action', () => {
        const result = burgerConstructorReducer(undefined, { type: '' });
        expect(result).toEqual({
            bun: null,
            ingredients: [],
            isModalOpen: false,
        });
    });

    it('should handle addIngredient action (bun)', () => {
        const action = burgerConstructorActions.addIngredient(mockBun, 0);

        const result = burgerConstructorReducer(undefined, action);

        expect(result.bun).toEqual({
            ...mockBun,
            uuid: TEST_UUID,
        });
        expect(result.ingredients).toEqual([]);
        expect(result.isModalOpen).toBe(false);
    });

    it('should handle addIngredient action (non-bun)', () => {
        const action = burgerConstructorActions.addIngredient(mockIngredient, 0);

        const initialState = {
            bun: null,
            ingredients: [],
            isModalOpen: false,
        };
        const result = burgerConstructorReducer(initialState, action);

        expect(result.bun).toBeNull();
        expect(result.ingredients).toHaveLength(1);
        expect(result.ingredients[0]).toEqual({
            ...mockIngredient,
            uuid: TEST_UUID,
        });
        expect(result.isModalOpen).toBe(false);
    });

    it('should handle moveItem action', () => {
        const initialState = {
            bun: null,
            ingredients: [
                { ...mockIngredient, uuid: 'uuid-1' },
                { ...mockIngredient, uuid: 'uuid-2' },
                { ...mockIngredient, uuid: 'uuid-3' },
            ],
            isModalOpen: false,
        };

        const action = burgerConstructorActions.moveItem({ fromIndex: 0, toIndex: 2 });
        const result = burgerConstructorReducer(initialState, action);

        expect(result.ingredients.map(item => item.uuid)).toEqual([
            'uuid-2',
            'uuid-3',
            'uuid-1',
        ]);
    });

    it('should handle removeIngredient action', () => {
        const initialState = {
            bun: null,
            ingredients: [
                { ...mockIngredient, uuid: 'uuid-1' },
                { ...mockIngredient, uuid: 'uuid-2' },
            ],
            isModalOpen: false,
        };

        const action = burgerConstructorActions.removeIngredient('uuid-1');
        const result = burgerConstructorReducer(initialState, action);

        expect(result.ingredients).toHaveLength(1);
        expect(result.ingredients[0].uuid).toBe('uuid-2');
    });

    it('should handle openModal action', () => {
        const initialState = {
            bun: null,
            ingredients: [],
            isModalOpen: false,
        };

        const action = burgerConstructorActions.openModal();
        const result = burgerConstructorReducer(initialState, action);

        expect(result.isModalOpen).toBe(true);
    });

    it('should handle closeModal action', () => {
        const initialState = {
            bun: null,
            ingredients: [],
            isModalOpen: true,
        };

        const action = burgerConstructorActions.closeModal();
        const result = burgerConstructorReducer(initialState, action);

        expect(result.isModalOpen).toBe(false);
    });

    it('should handle clearConstructor action', () => {
        const initialState = {
            bun: mockBun,
            ingredients: [mockIngredient],
            isModalOpen: false,
        };

        const action = burgerConstructorActions.clearConstructor();
        const result = burgerConstructorReducer(initialState, action);

        expect(result).toEqual({
            bun: null,
            ingredients: [],
            isModalOpen: false,
        });
    });
});
