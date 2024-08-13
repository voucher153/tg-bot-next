import { ICategory } from "./category.interface";

export interface IProduct {
    id: string,
    name: string,
    price: number,
    imageUrl: string,
    category: ICategory,
    createdAt: string
}

export type TypeProductData = {
    name: string
    imageUrl: string
    categoryId: string
    price: number
}

export type TypeProductDataFilters = {
    sort?: EnumProductSort
    searchTerm?: string
    page?: string | number
    perPage?: string | number
}

export enum EnumProductSort {
    HIGH_PRICE = 'high-price',
    LOW_PRICE = 'low-price',
    NEWEST = 'newest',
    OLDEST = 'oldest'
}

export interface IProductDetails {
    product: IProduct
}