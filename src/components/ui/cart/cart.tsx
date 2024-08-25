'use client'

import s from './cart.module.scss'
import { useCart } from "@/hooks/useCart"
import { useRouter } from "next/navigation"
import { CartItem } from "./cart-item/cart-item"
import Image from 'next/image'
import logo from '../../../../public/img/Frame.svg'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { IOrderPost } from '@/types/order.interface'
import { orderService } from '@/services/order/order.service'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { ICartItemPost } from '@/types/cart.interface'
import { useActions } from '@/hooks/useActions'
import { OrderProducts } from './products/products'

export const CartPage = () => {

    const cart = useCart()
    const {back, push} = useRouter()

    const {reset} = useActions()

    let price: number = 0;

    cart.items.forEach(item => price += +item.price)

    const {mutate} = useMutation({
        mutationKey: ['place order'],
        mutationFn: (data: IOrderPost) => orderService.placeOrder(data),
        onSuccess() {
            toast.success('Заказ создан')
            push('/orders')
        },
        onError(error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data!.message)
            }
        }
    })

    const items: ICartItemPost[] = cart.items.map(item => {
        return {
            productId: item.product.id,
            price: item.price,
            quantity: item.quantity
        }
    })

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.header}>
                    <Image 
                        width={180} 
                        height={100} 
                        src={logo} 
                        alt='logo' 
                        className={s.logo}
                    />
                    <div className={s.edit} onClick={back}>Изменить</div>
                </div>
                <div className={s.products}>
                    <OrderProducts items={cart.items} />
                    <div className={s['final-price']}>
                        <span>Итого:</span>
                        <span className={s.price}>{price}₽</span>
                    </div>
                </div>
            </div>
            <div 
                className={s.button} 
                onClick={() => {
                    mutate({
                        status: 'new_order',
                        items: items
                    })
                    reset()
                }}
            >
                Заказать
            </div>
        </div>
    )
}