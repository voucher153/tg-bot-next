import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "./user.interface";
import { checkAuth, login, logout, register } from "./user.actions";

const initialState: IInitialState = {
    // user: localStorage.getItem('user') ? JSON.parse
    //     (localStorage.getItem('user') as string) : null,
    user: null,
    isLoading: false,
    orders: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, {payload}) => {
                state.isLoading = false,
                state.user = payload.user
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, {payload}) => {
                state.isLoading = false,
                state.user = payload.user
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false,
                state.user = null
            })
            .addCase(logout.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(checkAuth.fulfilled, (state, {payload}) => {
                state.user = payload.user
            })
    }
})