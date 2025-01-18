import passwordResetReducer, {initialState} from './password-reset-slice';
import {
    forgotPassword,
    resetPassword,
} from './password-reset-slice';
import { UNKNOWN_ERROR } from '../utils';

describe('passwordReset slice', () => {
    it('should return the initial state on first run', () => {
        const result = passwordResetReducer(undefined, { type: '' });
        expect(result).toEqual(initialState);
    });

    describe('forgotPassword thunk', () => {
        it('should handle forgotPassword.pending', () => {
            const action = { type: forgotPassword.pending.type };
            const newState = passwordResetReducer(initialState, action);

            expect(newState.loading.forgotPassword).toBe(true);
            expect(newState.error.forgotPassword).toBeNull();
            expect(newState.tokenRequested).toBe(false);
        });

        it('should handle forgotPassword.fulfilled', () => {
            const action = { type: forgotPassword.fulfilled.type };
            const newState = passwordResetReducer(initialState, action);

            expect(newState.loading.forgotPassword).toBe(false);
            expect(newState.error.forgotPassword).toBeNull();
            expect(newState.tokenRequested).toBe(true);
        });

        it('should handle forgotPassword.rejected (with payload)', () => {
            const errorMessage = 'Something went wrong';
            const action = {
                type: forgotPassword.rejected.type,
                payload: errorMessage,
                error: { message: errorMessage },
            };
            const newState = passwordResetReducer(initialState, action);

            expect(newState.loading.forgotPassword).toBe(false);
            expect(newState.error.forgotPassword).toBe(errorMessage);
            expect(newState.tokenRequested).toBe(false);
        });

        it('should handle forgotPassword.rejected (no payload or empty error)', () => {
            const action = {
                type: forgotPassword.rejected.type,
                payload: undefined,
                error: { message: '' },
            };
            const newState = passwordResetReducer(initialState, action);

            expect(newState.loading.forgotPassword).toBe(false);
            expect(newState.error.forgotPassword).toBe(UNKNOWN_ERROR);
            expect(newState.tokenRequested).toBe(false);
        });
    });

    describe('resetPassword thunk', () => {
        it('should handle resetPassword.pending', () => {
            const action = { type: resetPassword.pending.type };
            const newState = passwordResetReducer(initialState, action);

            expect(newState.loading.resetPassword).toBe(true);
            expect(newState.error.resetPassword).toBeNull();
        });

        it('should handle resetPassword.fulfilled', () => {
            const action = { type: resetPassword.fulfilled.type };
            const newState = passwordResetReducer(initialState, action);

            expect(newState.loading.resetPassword).toBe(false);
            expect(newState.error.resetPassword).toBeNull();
            expect(newState.tokenRequested).toBe(false);
        });

        it('should handle resetPassword.rejected (with payload)', () => {
            const errorMessage = 'Reset failed';
            const action = {
                type: resetPassword.rejected.type,
                payload: errorMessage,
                error: { message: errorMessage },
            };
            const newState = passwordResetReducer(initialState, action);

            expect(newState.loading.resetPassword).toBe(false);
            expect(newState.error.resetPassword).toBe(errorMessage);
        });

        it('should handle resetPassword.rejected (no payload or empty error)', () => {
            const action = {
                type: resetPassword.rejected.type,
                payload: undefined,
                error: { message: '' },
            };
            const newState = passwordResetReducer(initialState, action);

            expect(newState.loading.resetPassword).toBe(false);
            expect(newState.error.resetPassword).toBe(UNKNOWN_ERROR);
        });
    });
});
