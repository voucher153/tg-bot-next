'use client'

import { FC, useState } from 'react'
import { CartItem } from '../cart-item/cart-item'
import s from './products.module.scss'
import { ICartItem } from '@/types/cart.interface'

export const OrderProducts: FC<{items: ICartItem[], orderPage?: boolean}> = ({items, orderPage}) => {
    
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className={items.length < 10 ? 
                s.items :
                open ? 
                    `${s.items} ${s.opened}` :
                    `${s.items} ${s.closed}`}>
            {!orderPage ? <h3 className={s.title}>Ваш заказ</h3> : null}
            {items.map((item) => {
                return (
                    <CartItem cartItem={item} />
                )
            })}
        </div>
            {items.length <= 4 ?
                    null :
                    open ?
                        (
                            <div 
                                className={s.show}
                                onClick={() => setOpen(false)}
                            >
                                Свернуть
                            </div>
                        ) : (
                            <div 
                                className={s.show}
                                onClick={() => setOpen(true)}
                            >
                                Показать все
                            </div>
            )}
        </>
    )
}