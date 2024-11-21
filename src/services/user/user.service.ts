import { axiosWithAuth } from "../../api/interceptors"
import { IUser, IUserPersonal, TypeUserUpdateForm } from "../../types/auth.interface"

const BASE_URL = '/user/profile'

export const userService = {
    async getProfile() {
        return axiosWithAuth.get<IUserPersonal>(BASE_URL)
    },

    async update(data: TypeUserUpdateForm) {
        return axiosWithAuth.put(BASE_URL, data)
    }

}