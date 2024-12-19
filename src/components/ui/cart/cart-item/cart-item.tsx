'use client'

import { ICartItem } from "@/types/cart.interface"
import Image from "next/image"
import { FC, useEffect } from "react"
import s from './cart-item.module.scss'
import { Loader } from "@/components/utils/loader/loader"

export const CartItem: FC<{cartItem: ICartItem}> = ({cartItem}) => {
    
    if (!cartItem.product) {
        return <Loader />
    }

    return (
        <div className={s.item}>
            <div className={s['main-info']}>
                <Image width={50} height={50} src={cartItem.product.imageUrl} alt="product" />
                <div className={s['text-info']}>
                    <span>{cartItem.product.name}</span>
                    <span className={s.quantity}>{cartItem.quantity}x</span>
                </div>
            </div>
            <div className={s.price}>
                <span>{cartItem.price}₽</span>
            </div>
        </div>
    )
}