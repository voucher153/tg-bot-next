'use client'

import { FormSubmitHandler, SubmitHandler, useForm } from "react-hook-form"
import { IProduct, TypeProductData } from "@/types/product.interface"
import { ProductImage } from "./product-image/product-image"
import s from './update-form.module.scss'
import { useMutation, useQuery } from "@tanstack/react-query"
import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { IOrder } from "@/types/order.interface"
import { ICategory } from "@/types/category.interface"
import { productService } from "@/services/product/product.service"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { isAxiosError } from "axios"
import { MoveLeft } from "lucide-react"
import { InputUpdate } from "@/components/utils/input-update/input-update"
import { Button } from "@/components/utils/button/button"

interface IUpdateProductForm {
    defaultValues: {
        name: string,
        categoryId: string,
        price: string,
        imageUrl: string,
        new: string
        articule: string
        measurement: string
    }
    src?: string,
    id: string
}

interface IUpdateCategoryForm {
    defaultValues: {
        name: string,
        categoryId: string,
        price: string,
        imageUrl: string,
        new: string
        articule: string
        measurement: string
    },
    src?: string,
    id: string
}

export const UpdateForm: FC<IUpdateProductForm> = ({defaultValues, src, id}) => {
    
    console.log(src)

    const {push, back} = useRouter()

    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        reset
    } = useForm<TypeProductData>({
        defaultValues
    })

    const {mutate} = useMutation({
        mutationKey: ['update product'],
        mutationFn: (data: TypeProductData) => productService.update(id, data),
        onSuccess() {
            debugger
            toast.success('Изменения применены')
            reset()
            push('/admin')
        },
        onError(error) {
            debugger
            if (isAxiosError(error)) {
                toast.error(error.response?.data!.message)
            }
        }
    })

    console.log(defaultValues)

    const onSubmit: SubmitHandler<TypeProductData> = (data) => {
        if (data.file) {data.imageUrl = ''}
        console.log(data)
        debugger
        mutate(data)
    }

    return (
        <form className={s['form-wrapper']} onSubmit={handleSubmit(onSubmit)}>
                <div onClick={back} className={s.back}>
                    <MoveLeft color="#2734a3" size={25} />
                </div>
                <div className={s.content}>
                    <ProductImage setValue={setValue} register={register} src={src} />
                    <div className={s.input}>
                        <InputUpdate 
                            register={register}
                            errors={errors}
                            name="name"
                            type="text"
                            defaultValue=''
                            placeholder="Название"
                        />
                    </div>
                    <div className={s.input}>
                        <InputUpdate 
                            register={register}
                            errors={errors}
                            name="categoryId"
                            type="text"
                            defaultValue=''
                            placeholder="ID Категории"
                        />
                    </div>
                    <div className={s.input}>
                        <span className={s['radio-title']}>Новинка?</span>
                        <div className={s.radio}>
                            <label>
                                <input 
                                    {...register('new')}
                                    type="radio"
                                    value={1}
                                />
                                Да
                            </label>
                            <label>
                                <input 
                                        {...register('new')}
                                        type="radio"
                                        value={0}
                                    />
                                    Нет
                            </label>
                        </div>
                    </div>
                    <div className={s.input}>
                        <InputUpdate 
                            register={register}
                            errors={errors}
                            name="measurement"
                            type="text"
                            defaultValue=''
                            placeholder="Ед. Измерения"
                        />
                    </div>
                    <div className={s.input}>
                        <InputUpdate 
                            register={register}
                            errors={errors}
                            name="articule"
                            type="text"
                            defaultValue=''
                            placeholder="Артикул"
                        />
                    </div>
                    <div className={s.input}>
                        <InputUpdate 
                            register={register}
                            errors={errors}
                            name="price"
                            type="text"
                            placeholder="Цена"
                        />
                    </div>
                    <button className={s.button} type="submit">
                        <Button>Применить</Button>
                    </button>
                </div>
                
        </form>
    )
}