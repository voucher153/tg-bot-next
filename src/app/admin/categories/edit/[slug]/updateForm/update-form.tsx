'use client'

import { FormSubmitHandler, SubmitHandler, useForm } from "react-hook-form"
import { IProduct, TypeProductData } from "@/types/product.interface"
import { ProductImage } from "./product-image/product-image"
import s from './update-form.module.scss'
import { useMutation, useQuery } from "@tanstack/react-query"
import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { EnumOrderStatus, IOrder } from "@/types/order.interface"
import { ICategory, UpdateCat } from "@/types/category.interface"
import { productService } from "@/services/product/product.service"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { isAxiosError } from "axios"
import { MoveLeft } from "lucide-react"
import { InputUpdate } from "@/components/utils/input-update/input-update"
import { Button } from "@/components/utils/button/button"
import { orderService } from "@/services/order/order.service"
import { categoryService } from "@/services/category/category.service"

interface IUpdateCategoryForm {
    defaultValues: {
        name: string
    },
    id: string
}

export interface Form {
    name: string
}

export const UpdateForm: FC<IUpdateCategoryForm> = ({defaultValues, id}) => {

    const {push, back} = useRouter()

    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        reset
    } = useForm<Form>({
        defaultValues
    })

    const {mutate} = useMutation({
        mutationKey: ['update category'],
        mutationFn: (data: UpdateCat) => categoryService.update(id, data),
        onSuccess() {
            debugger
            toast.success('Изменения применены')
            reset()
            push('/admin/categories')
        },
        onError(error) {
            debugger
            if (isAxiosError(error)) {
                toast.error(error.response?.data!.message)
            }
        }
    })

    const onSubmit: SubmitHandler<Form> = (data) => {
        console.log(data)
        mutate(data)
    }

    return (
        <form className={s['form-wrapper']} onSubmit={handleSubmit(onSubmit)}>
                <div onClick={back} className={s.back}>
                    <MoveLeft color="#2734a3" size={25} />
                </div>
                <div className={s.content}>
                    <div className={s.input}>
                        <InputUpdate 
                            register={register}
                            name="name"
                            errors={errors}
                            type="text"
                            defaultValue=""
                            placeholder="Название"
                        />
                    </div>
                    <button className={s.button} type="submit">
                        <Button>Применить</Button>
                    </button>
                </div>
                
        </form>
    )
}