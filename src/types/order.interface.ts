import { IUser } from "./auth.interface"
import { ICartItem } from "./cart.interface"

export enum EnumOrderStatus {
    NEW_ORDER = 'NEW ORDER',
    ACCEPTED_ORDER = 'ORDER_ACCEPTED'
}

export interface IOrder {
    id: string
    createdAt: string
    status: EnumOrderStatus
    items: ICartItem[]
    user: IUser
}