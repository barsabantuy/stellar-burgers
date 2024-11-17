import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forgotPasswordRequest, resetPasswordRequest } from './api';

export const forgotPassword = createAsyncThunk(
    'passwordReset/forgotPassword',
    async form => {
        return forgotPasswordRequest(form);
    }
);

export const resetPassword = createAsyncThunk(
    'passwordReset/reset',
    async form => {
        return resetPasswordRequest(form);
    }
);

const initialState = {
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
                state.error.forgotPassword = action.payload || action.error.message;
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
                state.error.resetPassword = action.payload || action.error.message;
            });
    },
});

export default passwordResetSlice.reducer;
