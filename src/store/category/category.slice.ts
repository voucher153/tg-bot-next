import { ICategory } from "@/types/category.interface"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ICategorySlice {
    categories: ICategory[]
    filter: string[]
}

const initialState: ICategorySlice = {
    categories: [],
    filter: []
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.categories = [...action.payload]
        },
        changeFilter: (state, action: PayloadAction<string>) => {
            const id = state.filter.indexOf(action.payload) 
            if (id > -1) {
                state.filter.splice(id, 1)
            } else {
                state.filter.push(action.payload)
            }
        },
        resetFilter: (state) => {
            state.filter = []
        }
    }
})