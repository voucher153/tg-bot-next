import { axiosWithAuth } from "../../api/interceptors"
import { IUser } from "../../types/auth.interface"

const BASE_URL = '/user'

export const userService = {
    async getProfile() {
        return axiosWithAuth.get<IUser[]>(BASE_URL)
    },

}