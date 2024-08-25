import { IOrder, IOrderPost, TypeOrdersDataSearch, TypePaginationOrders } from './../../types/order.interface';
import { axiosWithAuth } from "../../api/interceptors"

const BASE_URL = '/order'

export const orderService = {

    async getAll(queryData = {} as TypeOrdersDataSearch) {
        const data = await axiosWithAuth.get<TypePaginationOrders>(BASE_URL, {
            params: queryData
        })
        console.log(data)
        return {
            orders: data.data.orders,
            length: data.data.length
        }
    },

    async getByUserId() {
        return axiosWithAuth.get<IOrder[]>(`${BASE_URL}/by-user`)
    },

    async placeOrder(data: IOrderPost) {
        return axiosWithAuth.post<IOrder>(BASE_URL, data)
    },

    async update(id: string, data: {status: string}) {
        return axiosWithAuth.put(`${BASE_URL}/${id}`, data)
    },

}