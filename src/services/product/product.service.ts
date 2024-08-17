import { axiosWithAuth } from "../../api/interceptors"
import { IProduct, TypePaginationsProducts, TypeProductData, TypeProductDataFilters } from "../../types/product.interface"

const BASE_URL = '/product'

export const productService = {
    async getAll(queryData = {} as TypeProductDataFilters) {
        return axiosWithAuth.get<TypePaginationsProducts>(BASE_URL, {
            params: queryData
        })
    },

    async getById(id: string) {
        return axiosWithAuth.get<IProduct[]>(`${BASE_URL}/${id}`)
    },

    async getBySlug(slug: string) {
        const {data} = await axiosWithAuth.get<IProduct[]>(`${BASE_URL}/by-slug/${slug}`)
        return data
    },

    async getByCategory(categorySlug: string) {
        return axiosWithAuth.get<IProduct[]>(`${BASE_URL}/by-category/${categorySlug}`)
    },

    async create() {
        return axiosWithAuth.post(BASE_URL) 
    },

    async update(id: string, data: TypeProductData) {
        return axiosWithAuth.put(`${BASE_URL}/${id}`, data)
    },

    async delete(id: string) {
        return axiosWithAuth.delete(`${BASE_URL}/${id}`)
    }
}