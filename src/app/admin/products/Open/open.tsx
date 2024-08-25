'use client'

import { productService } from "@/services/product/product.service"
import { useMutation } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import s from './open.module.scss'



export const Open = ({refetch}: {refetch: any}) => {

    const {mutate} = useMutation({
        mutationKey: ['create product'],
        mutationFn: () => productService.create(),
        onSuccess: () => {
            toast.success('Продукт создан')
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