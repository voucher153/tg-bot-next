'use client'

import { Loader } from "@/components/utils/loader/loader"
import { useProductData } from "./useProductData"
import { UpdateForm } from "./updateForm/update-form"

export const EditPageProduct = ({id}: {id: string}) => {
    
    const {data, isFetching} = useProductData(id)

    if (isFetching) {
        return <Loader />
    }

    const defaultValues = {
        name: data?.name!,
        categoryId: data?.categoryId!,
        articule: data?.articule!,
        measurement: data?.measurement!,
        new: String(+data?.new!),
        imageUrl: data?.imageUrl!,
        price: String(data?.price!),
        quantity: String(data?.quantity),
        cratn: String(data?.cratn)
    }

    return (
        <UpdateForm
            defaultValues={defaultValues}
            id={id}
            src={data?.imageUrl}
        />
    )
}