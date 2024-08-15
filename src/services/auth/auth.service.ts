

import { removeTokenFromStorage, removeTypeFromStorage, saveTokenStorage, saveToLocalStorage, saveTypeToStorage } from "./auth-token.service"
import { IAuthForm, IAuthResponce } from "../../types/auth.interface"
import { axiosClassic } from "../../api/interceptors"

export enum EnumTokens {
    'ACCESS_TOKEN' = 'accessToken',
    'REFRESH_TOKEN' = 'refreshToken'
}

export const authService = {
    async main(type: 'login' | 'register', data: IAuthForm) {
        const responce = await axiosClassic.post<IAuthResponce>(`auth/${type}`, data)
        debugger
        if (responce.data.accessToken) {
            //saveTypeToStorage(responce.data.user.user.type!)
            saveToLocalStorage(responce.data)
        }

        return responce
    },
    
    async getNewToken() {
        const responce = await axiosClassic.post<IAuthResponce>('auth/login/access-token')
        if (responce.data.accessToken) saveTokenStorage(responce.data.accessToken)

        return responce
    },

    async logout() {
        const responce = await axiosClassic.post<boolean>('auth/logout')
        debugger
        if (responce) {
            removeTokenFromStorage()
            removeTypeFromStorage()
        }
        
        return responce
    }
}