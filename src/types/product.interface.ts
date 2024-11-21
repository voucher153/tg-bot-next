import { ICategory } from "./category.interface";

export interface IProduct {
    id: string,
    name: string,
    articule: string
    measurement: string
    quantity: number
    price: number,
    imageUrl: string,
    cratn: string
    categoryId: string,
    createdAt: string
    new: boolean
    slug: string
}

export type TypeProductData = {
    name: string
    imageUrl: string
    categoryId: string
    price: string,
    file: File | ''
    new: string
    measurement: string
    articule: string
    quantity: string
    cratn: string
}

export type TypeProductDataFilters = {
    sort?: EnumProductSort
    searchTerm?: string
    page?: string | number
    perPage?: string | number,
    categoryNames?: string[]
}

export enum EnumProductSort {
    HIGH_PRICE = 'high-price',
    LOW_PRICE = 'low-price',
    NEWEST = 'newest',
    OLDEST = 'oldest'
}

export enum EnumProductSortRus {
    HIGH_PRICE = 'Сначала подороже',
    LOW_PRICE = 'Сначала подешевле',
    NEWEST = 'Сначала новые',
    OLDEST = 'Сначала старые'
}

export interface IProductDetails {
    product: IProduct
}

export type TypeParamsFilters = {
    searchParams: TypeProductDataFilters
}

export type TypePaginationsProducts = {
    length: number
    products: IProduct[]
}