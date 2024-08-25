'use client'

import { productService } from "@/services/product/product.service"
import { useMutation } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import s from './open.module.scss'
import { categoryService } from "@/services/category/category.service"



export const Open = ({refetch}: {refetch: any}) => {

    const {mutate} = useMutation({
        mutationKey: ['create product'],
        mutationFn: () => categoryService.create(),
        onSuccess: () => {
            toast.success('Категория создана')
            refetch()
        },
        onError: () => {
            debugger
        }
    })

    return (
        <div className={s.open} onClick={() => {
            
            mutate()
        }}>
            <Plus color="#2734a3" />
        </div>
    )
}