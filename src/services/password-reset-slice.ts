import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forgotPasswordRequest, resetPasswordRequest } from './api';
import {UNKNOWN_ERROR} from "../utils";
import {TForm} from "../types";

export const forgotPassword = createAsyncThunk(
    'passwordReset/forgotPassword',
    async (form: TForm) => {
        return forgotPasswordRequest(form);
    }
);

export const resetPassword = createAsyncThunk(
    'passwordReset/reset',
    async (form: TForm) => {
        return resetPasswordRequest(form);
    }
);

interface IPasswordResetSlice {
    tokenRequested: boolean;
    loading: {
        forgotPassword: boolean;
        resetPassword: boolean;
    };
    error: {
        forgotPassword: {} | string | null;
        resetPassword: {} | string | null;
    };
}

export const initialState: IPasswordResetSlice = {
    tokenRequested: false,
    loading: {
        forgotPassword: false,
        resetPassword: false,
    },
    error: {
        forgotPassword: null,
        resetPassword: null,
    },
};

const passwordResetSlice = createSlice({
    name: 'passwordReset',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading.forgotPassword = true;
                state.error.forgotPassword = null;
                state.tokenRequested = false;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading.forgotPassword = false;
                state.error.forgotPassword = null;
                state.tokenRequested = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading.forgotPassword = false;
                state.error.forgotPassword = action.payload || action.error.message || UNKNOWN_ERROR;
                state.tokenRequested = false;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading.resetPassword = true;
                state.error.resetPassword = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading.resetPassword = false;
                state.error.resetPassword = null;
                state.tokenRequested = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading.resetPassword = false;
                state.error.resetPassword = action.payload || action.error.message || UNKNOWN_ERROR;
            });
    },
});

export default passwordResetSlice.reducer;
