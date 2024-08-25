'use client'

import clsx from "clsx"
import s from "./input-update.module.scss"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TypeProductData } from "@/types/product.interface"
import { Form } from "@/app/admin/categories/edit/[slug]/updateForm/update-form"

interface IInput {
    register: any
    name: "name" | "imageUrl" | "categoryId" | "price" | "file" | "new" | "measurement" | "articule"
    type: string
    placeholder?: string
    defaultValue?: string
    errors: FieldErrors<TypeProductData>
}

export const InputUpdate = ({register, name, type, placeholder, defaultValue="", errors}: IInput) => {
    
    const error = errors?.[name]?.message as string | undefined

    return (
        <div className={s['input-block']}>
            
            <input 
                {...register(name)}
                name={name}
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className={s.input}
            />
            <div className={s.error}>{error}</div>
        </div>
    )
}