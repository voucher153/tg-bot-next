import { axiosWithAuth } from "../../api/interceptors"
import { ICategory } from "../../types/category.interface"

const BASE_URL = '/category'

export const categoryService = {
    async getAll() {
        return axiosWithAuth.get<ICategory[]>(BASE_URL)
    },

    async getById(id: string) {
        return axiosWithAuth.get<ICategory[]>(`${BASE_URL}/${id}`)
    },

    async getBySlug(slug: string) {
        return axiosWithAuth.get<ICategory[]>(`${BASE_URL}/by-slug/${slug}`)
    },

    async create() {
        return axiosWithAuth.post(BASE_URL) 
    },

    async update(id: string, categoryName: string) {
        return axiosWithAuth.put(`${BASE_URL}/${id}`, categoryName)
    },

    async delete(id: string) {
        return axiosWithAuth.delete(`${BASE_URL}/${id}`)
    }


}