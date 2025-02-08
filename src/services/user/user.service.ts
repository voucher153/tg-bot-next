import { SmsSend } from "@/types/sms.interface"
import { axiosWithAuth } from "../../api/interceptors"
import { IUser, IUserPersonal, TypeUserUpdateForm } from "../../types/auth.interface"
import axios from "axios"

const BASE_URL = '/user/profile'
const SMS_URL = 'https://v3.api.termii.com/api/sms/send'

export const userService = {
    async getProfile() {
        return axiosWithAuth.get<IUserPersonal>(BASE_URL)
    },

    async update(data: TypeUserUpdateForm) {
        return axiosWithAuth.put(BASE_URL, data)
    },

    async sendSms(data: SmsSend) {
        return axios.post(SMS_URL, data)
    }
}