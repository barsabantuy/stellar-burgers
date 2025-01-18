import orderDetailsReducer, {initialState} from './order-details-slice';
import { createOrder } from './order-details-slice';
import { UNKNOWN_ERROR } from '../utils';
import {TOrderCreated} from '../types';

describe('orderDetailsSlice reducer', () => {
    it('should return the initial state on first run', () => {
        const result = orderDetailsReducer(undefined, { type: '' });
        expect(result).toEqual(initialState);
    });

    describe('createOrder thunk', () => {
        it('should handle createOrder.pending', () => {
            const action = { type: createOrder.pending.type };
            const result = orderDetailsReducer(initialState, action);

            expect(result.loading).toBe(true);
            expect(result.name).toBe('');
            expect(result.order).toBe(0);
            expect(result.error).toBeNull();
        });

        it('should handle createOrder.fulfilled', () => {
            const mockPayload: TOrderCreated = {
                name: 'Test Order',
                order: { number: 1234 }
            };
            const action = {
                type: createOrder.fulfilled.type,
                payload: mockPayload,
            };

            const result = orderDetailsReducer(initialState, action);

            expect(result.loading).toBe(false);
            expect(result.name).toBe(mockPayload.name);
            expect(result.order).toBe(mockPayload.order.number);
            expect(result.error).toBeNull();
        });

        it('should handle createOrder.rejected (with payload)', () => {
            const errorMessage = 'Something went wrong';
            const action = {
                type: createOrder.rejected.type,
                payload: errorMessage,
                error: { message: errorMessage },
            };

            const result = orderDetailsReducer(initialState, action);

            expect(result.loading).toBe(false);
            expect(result.name).toBe('');
            expect(result.order).toBe(0);
            expect(result.error).toBe(errorMessage);
        });

        it('should handle createOrder.rejected (no payload or error message)', () => {
            const action = {
                type: createOrder.rejected.type,
                payload: undefined,
                error: { message: '' },
            };

            const result = orderDetailsReducer(initialState, action);

            expect(result.loading).toBe(false);
            expect(result.name).toBe('');
            expect(result.order).toBe(0);
            expect(result.error).toBe(UNKNOWN_ERROR);
        });
    });
});
