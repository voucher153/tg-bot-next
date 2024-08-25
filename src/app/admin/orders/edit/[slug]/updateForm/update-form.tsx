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
import { ICategory } from "@/types/category.interface"
import { productService } from "@/services/product/product.service"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { isAxiosError } from "axios"
import { MoveLeft } from "lucide-react"
import { InputUpdate } from "@/components/utils/input-update/input-update"
import { Button } from "@/components/utils/button/button"
import { orderService } from "@/services/order/order.service"

interface IUpdateCategoryForm {
    defaultValues: {
        status: EnumOrderStatus
    },
    id: string
}

interface Form {
    status: string
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
        mutationKey: ['update product'],
        mutationFn: (data: Form) => orderService.update(id, data),
        onSuccess() {
            debugger
            toast.success('Изменения применены')
            reset()
            push('/admin/orders')
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
                        <select 
                            className={s.select} 
                            {...register('status')}
                            onChange={(e) => {
                                setValue('status', e.target.value)
                            }}
                        >
                            <option value={EnumOrderStatus.NEW_ORDER}>
                                Новый заказ
                            </option>
                            <option value={EnumOrderStatus.ACCEPTED_ORDER}>
                                Заказ принят
                            </option>
                        </select>
                    </div>
                    <button className={s.button} type="submit">
                        <Button>Применить</Button>
                    </button>
                </div>
                
        </form>
    )
}