import Cookies from 'js-cookie'
import { EnumTokens } from './auth.service'
import { IAuthResponce } from '../../types/auth.interface'

export const getAccessToken = () => {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
    return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
        domain: process.env.DOMAIN,
        sameSite: 'strict',
        expires: 1
    })
}

export const removeTokenFromStorage = () => {
    Cookies.remove(EnumTokens.ACCESS_TOKEN)
}

export const getType = () => {
    const type = Cookies.get('type')
    return type || null
}

export const saveTypeToStorage = (type: 'admin' | 'user') => {
    Cookies.set('type', type)
}

export const removeTypeFromStorage = () => {
    Cookies.remove('type')
}

export const saveToLocalStorage = (data: IAuthResponce) => {
    saveTokenStorage(data.accessToken)
    saveTypeToStorage(data.user.type!)
    localStorage.setItem('user', JSON.stringify(data.user))
}