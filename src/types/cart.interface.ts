import { IProduct } from "./product.interface";

export interface ICartItem {
    id: string,
    product: IProduct,
    quantity: number,
    price: number
}

export interface ICartItemPost {
    productId: string
    price: number
    quantity: number
}