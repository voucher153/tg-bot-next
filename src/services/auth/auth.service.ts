

import { removeTokenFromStorage, removeTypeFromStorage, saveTokenStorage } from "./auth-token.service"
import { IAuthForm, IAuthResponce } from "../../types/auth.interface"
import { axiosClassic } from "../../api/interceptors"

export enum EnumTokens {
    'ACCESS_TOKEN' = 'accessToken',
    'REFRESH_TOKEN' = 'refreshToken'
}

export const authService = {
    async main(type: 'login' | 'register', data: IAuthForm) {
        const responce = await axiosClassic.post<IAuthResponce>(`auth/${type}`, data)
        if (responce.data.accessToken) saveTokenStorage(responce.data.accessToken)

        return responce
    },

    async getNewToken() {
        const responce = await axiosClassic.post<IAuthResponce>('auth/login/access-token')
        if (responce.data.accessToken) saveTokenStorage(responce.data.accessToken)

        return responce
    },

    async logout() {
        const responce = await axiosClassic.post<boolean>('auth/logout')
        if (responce) {
            removeTokenFromStorage()
            removeTypeFromStorage()
        }
        
        return responce
    }
}