
import axios, { type CreateAxiosDefaults } from 'axios'

import { authService } from '../services/auth/auth.service'
import { errorCatch, getContentType } from './api.helper'
import { getAccessToken, removeTokenFromStorage } from '../services/auth/auth-token.service'

// base

const options: CreateAxiosDefaults = {
    baseURL: 'https://zhuravlevfactory.ru/api',
    // baseURL: process.env.SERVER_URL,
    headers: getContentType(),
    withCredentials: true
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
    const accessToken = getAccessToken()

    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

axiosWithAuth.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config

        if (
            (error.responce && error.responce.status === 401) || 
            errorCatch(error) === 'jwt expired' ||
            errorCatch(error) === 'jwt must be provided' &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true

            try {
                await authService.getNewToken()
                return axiosWithAuth.request(originalRequest)
            } catch {
                if (errorCatch(error) === 'jwt expired') removeTokenFromStorage()
            }
        }

        throw error
    }
)

export { axiosClassic, axiosWithAuth }