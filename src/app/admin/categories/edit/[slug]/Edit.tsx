'use client'

import { Loader } from "@/components/utils/loader/loader"
import { useCategoryData } from "./useProductData"
import { UpdateForm } from "./updateForm/update-form"

export const EditPageCategories = ({id}: {id: string}) => {
    
    const {data, isFetching} = useCategoryData(id)

    if (isFetching) {
        return <Loader />
    }

    const defaultValues = {
        name: data?.name!
    }

    return (
        <UpdateForm 
            defaultValues={defaultValues}
            id={id}
        />
    )
}