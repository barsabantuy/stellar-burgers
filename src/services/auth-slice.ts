import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    registerRequest,
    loginRequest,
    logoutRequest,
    getUserRequest,
    updateUserRequest
} from "./api";
import {TForm, TUser, TUserResponse} from "../types";
import {UNKNOWN_ERROR} from "../utils";

export const register = createAsyncThunk(
    'auth/register',
    async (form: TForm) => {
        return registerRequest(form);
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (form: TForm) => {
        return loginRequest(form);
    }
);

export const getUser = createAsyncThunk(
    'auth/getUser', getUserRequest
);

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (form: TForm) => {
        return updateUserRequest(form);
    }
);

export const logout = createAsyncThunk(
    'auth/logout', logoutRequest
);

interface IAuthState {
    user: TUser | null;
    loading: {
        register: boolean;
        login: boolean;
        getUser: boolean;
        updateUser: boolean;
        logout: boolean;
        forgotPassword: boolean;
        resetPassword: boolean;
    },
    error: {
        register: {} | string | null;
        login: {} | string | null;
        getUser: {} | string | null;
        updateUser: {} | string | null;
        logout: {} | string | null;
        forgotPassword: {} | string | null;
        resetPassword: {} | string | null;
    }
}

const initialState: IAuthState = {
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
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading.register = true;
                state.error.register = null;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<TUserResponse>) => {
                state.user = action.payload.user;
                state.loading.register = false;
                state.error.register = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading.register = false;
                state.error.register = action.payload || action.error.message || UNKNOWN_ERROR;
            })
            .addCase(login.pending, (state) => {
                state.loading.login = true;
                state.error.login = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<TUserResponse>) => {
                state.user = action.payload.user;
                state.loading.login = false;
                state.error.login = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading.login = false;
                state.error.login = action.payload || action.error.message || UNKNOWN_ERROR;
            })
            .addCase(getUser.pending, (state) => {
                state.loading.getUser = true;
                state.error.getUser = null;
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<TUserResponse>) => {
                state.user = action.payload.user;
                state.loading.getUser = false;
                state.error.getUser = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading.getUser = false;
                state.error.getUser = action.payload || action.error.message || UNKNOWN_ERROR;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading.updateUser = true;
                state.error.updateUser = null;
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUserResponse>) => {
                state.user = action.payload.user;
                state.loading.updateUser = false;
                state.error.updateUser = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading.updateUser = false;
                state.error.updateUser = action.payload || action.error.message || UNKNOWN_ERROR;
            })
            .addCase(logout.pending, (state) => {
                state.loading.logout = true;
                state.error.logout = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.loading.logout = false;
                state.error.logout = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading.logout = false;
                state.error.logout = action.payload || action.error.message || UNKNOWN_ERROR;
            });
    },
});

export default authSlice.reducer;
