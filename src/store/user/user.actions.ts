import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthForm, IAuthResponce } from "../../types/auth.interface";
import { authService } from "../../services/auth/auth.service";
import { removeTokenFromStorage, removeTypeFromStorage } from "../../services/auth/auth-token.service";
import { errorCatch } from "../../api/api.helper";

export const register = createAsyncThunk<any, IAuthForm>(
    'auth/register',    
    async (data, thunkApi) => {
        try {
            const responce = await authService.main('register', data)
            return responce
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const login = createAsyncThunk<any, IAuthForm>(
    'auth/login',    
    async (data, thunkApi) => {
        try {
            const responce = await authService.main('login', data)
            return responce
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async () => {
    removeTokenFromStorage()
    removeTypeFromStorage()
})

export const checkAuth = createAsyncThunk(
    'auth/check-auth',
    async (_, thunkApi) => {
        try {
            const responce = await authService.getNewToken()
            return responce.data
        } catch(error) {
            if (errorCatch(error) === 'jwt expired') {
                thunkApi.dispatch(logout())
            }

            return thunkApi.rejectWithValue(error)
        }
    }
)