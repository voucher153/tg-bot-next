import { IUser } from "./auth.interface"
import { ICartItem, ICartItemPost } from "./cart.interface"

export enum EnumOrderStatus {
    NEW_ORDER = 'new_order',
    ACCEPTED_ORDER = 'order_accepted'
}

export interface IOrder {
    id: string
    createdAt: string
    status: EnumOrderStatus
    items: ICartItem[]
    user: IUser
}

export interface IOrderPost {
    status: string
    items: ICartItemPost[]
}

export type TypePaginationOrders = {
    orders: IOrder[],
    length: number
}

export type TypeOrdersDataSearch = {
    searchTerm?: string
    page?: string | number
    perPage?: string | number,
}