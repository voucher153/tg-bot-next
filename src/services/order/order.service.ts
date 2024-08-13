import { axiosWithAuth } from "../../api/interceptors"
import { IOrder } from "../../types/order.interface"

const BASE_URL = '/order'

export const orderService = {
    async getAll() {
        return axiosWithAuth.get<IOrder[]>(BASE_URL)
    }

}