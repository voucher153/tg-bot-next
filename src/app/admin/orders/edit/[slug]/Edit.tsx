'use client'

import { Loader } from "@/components/utils/loader/loader"
import { UpdateForm } from "./updateForm/update-form"
import { EnumOrderStatus } from "@/types/order.interface"

export const EditPageProduct = ({id}: {id: string}) => {

    const defaultValues = {
        status: EnumOrderStatus.NEW_ORDER
    }

    return (
        <UpdateForm 
            defaultValues={defaultValues}
            id={id}
        />
    )
}