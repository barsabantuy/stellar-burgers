import authReducer from './auth-slice';
import {
    register,
    login,
    getUser,
    updateUser,
    logout,
} from './auth-slice';
import { UNKNOWN_ERROR } from '../utils';
import { TUser, TUserResponse } from '../types';

const mockUserResponse = (overrides: Partial<TUser> = {}): TUserResponse => ({
    user: {
        email: 'test@example.com',
        name: 'Test User',
        ...overrides,
    },
});

const initialState = {
    user: null,
    loading: {
        register: false,
        login: false,
        getUser: false,
        updateUser: false,
        logout: false,
        forgotPassword: false,
        resetPassword: false,
    },
    error: {
        register: null,
        login: null,
        getUser: null,
        updateUser: null,
        logout: null,
        forgotPassword: null,
        resetPassword: null,
    },
};

describe('auth slice reducer', () => {
    it('should return the initial state on first run', () => {
        const result = authReducer(undefined, { type: '' });
        expect(result).toEqual(initialState);
    });

    describe('register thunk', () => {
        it('should handle register.pending', () => {
            const action = { type: register.pending.type };
            const state = authReducer(initialState, action);

            expect(state.loading.register).toBe(true);
            expect(state.error.register).toBeNull();
        });

        it('should handle register.fulfilled', () => {
            const userResponse = mockUserResponse({ name: 'Registered User' });
            const action = {
                type: register.fulfilled.type,
                payload: userResponse,
            };
            const state = authReducer(initialState, action);

            expect(state.loading.register).toBe(false);
            expect(state.error.register).toBeNull();
            expect(state.user).toEqual(userResponse.user);
        });

        it('should handle register.rejected', () => {
            const errorMessage = 'Registration failed';
            const action = {
                type: register.rejected.type,
                payload: errorMessage,
                error: { message: errorMessage },
            };

            const state = authReducer(initialState, action);

            expect(state.loading.register).toBe(false);
            expect(state.error.register).toBe(errorMessage);
        });

        it('should handle register.rejected with no payload', () => {
            const action = {
                type: register.rejected.type,
                payload: undefined,
                error: { message: '' },
            };
            const state = authReducer(initialState, action);

            expect(state.loading.register).toBe(false);
            expect(state.error.register).toBe(UNKNOWN_ERROR);
        });
    });

    describe('login thunk', () => {
        it('should handle login.pending', () => {
            const action = { type: login.pending.type };
            const state = authReducer(initialState, action);

            expect(state.loading.login).toBe(true);
            expect(state.error.login).toBeNull();
        });

        it('should handle login.fulfilled', () => {
            const userResponse = mockUserResponse({ name: 'Login User' });
            const action = {
                type: login.fulfilled.type,
                payload: userResponse,
            };
            const state = authReducer(initialState, action);

            expect(state.loading.login).toBe(false);
            expect(state.error.login).toBeNull();
            expect(state.user).toEqual(userResponse.user);
        });

        it('should handle login.rejected', () => {
            const errorMessage = 'Login error';
            const action = {
                type: login.rejected.type,
                payload: errorMessage,
                error: { message: errorMessage },
            };

            const state = authReducer(initialState, action);

            expect(state.loading.login).toBe(false);
            expect(state.error.login).toBe(errorMessage);
        });
    });

    describe('getUser thunk', () => {
        it('should handle getUser.pending', () => {
            const action = { type: getUser.pending.type };
            const state = authReducer(initialState, action);

            expect(state.loading.getUser).toBe(true);
            expect(state.error.getUser).toBeNull();
        });

        it('should handle getUser.fulfilled', () => {
            const userResponse = mockUserResponse({ name: 'Fetched User' });
            const action = {
                type: getUser.fulfilled.type,
                payload: userResponse,
            };
            const state = authReducer(initialState, action);

            expect(state.loading.getUser).toBe(false);
            expect(state.error.getUser).toBeNull();
            expect(state.user).toEqual(userResponse.user);
        });

        it('should handle getUser.rejected', () => {
            const errorMessage = 'Failed to get user';
            const action = {
                type: getUser.rejected.type,
                payload: errorMessage,
                error: { message: errorMessage },
            };

            const state = authReducer(initialState, action);

            expect(state.loading.getUser).toBe(false);
            expect(state.error.getUser).toBe(errorMessage);
        });
    });

    describe('updateUser thunk', () => {
        it('should handle updateUser.pending', () => {
            const action = { type: updateUser.pending.type };
            const state = authReducer(initialState, action);

            expect(state.loading.updateUser).toBe(true);
            expect(state.error.updateUser).toBeNull();
        });

        it('should handle updateUser.fulfilled', () => {
            const userResponse = mockUserResponse({ name: 'Updated User' });
            const action = {
                type: updateUser.fulfilled.type,
                payload: userResponse,
            };
            const state = authReducer(initialState, action);

            expect(state.loading.updateUser).toBe(false);
            expect(state.error.updateUser).toBeNull();
            expect(state.user).toEqual(userResponse.user);
        });

        it('should handle updateUser.rejected', () => {
            const errorMessage = 'User update error';
            const action = {
                type: updateUser.rejected.type,
                payload: errorMessage,
                error: { message: errorMessage },
            };

            const state = authReducer(initialState, action);

            expect(state.loading.updateUser).toBe(false);
            expect(state.error.updateUser).toBe(errorMessage);
        });
    });

    describe('logout thunk', () => {
        it('should handle logout.pending', () => {
            const action = { type: logout.pending.type };
            const state = authReducer(initialState, action);

            expect(state.loading.logout).toBe(true);
            expect(state.error.logout).toBeNull();
        });

        it('should handle logout.fulfilled', () => {
            const modifiedState = {
                ...initialState,
                user: { email: 'test@example.com', name: 'Test User' },
            };

            const action = { type: logout.fulfilled.type };
            const state = authReducer(modifiedState, action);

            expect(state.loading.logout).toBe(false);
            expect(state.error.logout).toBeNull();
            expect(state.user).toBeNull();
        });

        it('should handle logout.rejected', () => {
            const errorMessage = 'Logout error';
            const action = {
                type: logout.rejected.type,
                payload: errorMessage,
                error: { message: errorMessage },
            };

            const modifiedState = {
                ...initialState,
                user: { email: 'test@example.com', name: 'Test User' },
            };

            const state = authReducer(modifiedState, action);

            expect(state.loading.logout).toBe(false);
            expect(state.error.logout).toBe(errorMessage);
            expect(state.user).toEqual(modifiedState.user);
        });
    });
});
