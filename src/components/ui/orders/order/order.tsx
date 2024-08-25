'use client'

import { ICartItem } from "@/types/cart.interface";
import { IOrder } from "@/types/order.interface";
import { ChevronDown, Files } from "lucide-react";
import { FC, useState } from "react";
import s from './order.module.scss'
import { MoreInfo } from "./more-info/more-info";
import { useRouter } from "next/navigation";
import { useActions } from "@/hooks/useActions";

export const Order: FC<{order: IOrder}> = ({order}) => {
    
    let fullPrice: number = 0
    console.log(order)
    order.items.forEach(item => fullPrice += +item.price)

    const {push} = useRouter()
    const {setCart} = useActions()

    const [open, setOpen] = useState(false)
    let id: string = ''

    if (order.id.length > 8) {
        id = order.id.slice(0, 8) + '...'
    } else {
        id = order.id
    }

    const checkMonth = () => {
        switch (order.createdAt.slice(5, 7)) {
            case '01': return 'Январь'
            case '02': return 'Февраль'
            case '03': return 'Март'
            case '04': return 'Апрель'
            case '05': return 'Май'
            case '06': return 'Июнь'
            case '07': return 'Июль'
            case '08': return 'Август'
            case '09': return 'Сентябрь'
            case '10': return 'Октябрь'
            case '11': return 'Ноябрь'
            case '12': return 'Декабрь'
        }
    }

    

    const checkStatus = () => {
        if (order.status === 'new_order') {
            return 'Новый заказ'
        }
        return 'Заказ принят'
    }

    const handleCopy = () => {
        const items = order.items.map(item => item)
        push('/')
        setCart(items)
    }

    return (
        <>
            <div className={open ? `${s.wrapper} ${s['opened-wrapper']}` : s.wrapper}>
                <div className={s['first-info']}>
                    <div>
                        <span className={s.date}>{checkMonth()} {order.createdAt.slice(8, 10)}, {order.createdAt.slice(0, 4)}</span>
                    </div>
                    <span className={checkStatus() == 'Новый заказ' ? 
                        `${s.status} ${s.new}` :
                        `${s.status} ${s.accept}`}>{checkStatus()}</span>
                    <div className={s.icons}>
                        <div className={s.copy} onClick={handleCopy}>
                            <Files size={20} strokeWidth={1.5} color="#585858" />
                        </div>
                        <div className={open ? `${s.arrow} ${s.open}` : s.arrow} onClick={() => setOpen(!open)}>
                            <ChevronDown />
                        </div>
                    </div>
                </div>
                <MoreInfo order={order} date={`${checkMonth()} ${order.createdAt.slice(8, 10)}, ${order.createdAt.slice(0, 4)}`} />
            </div>
        </>
        
    );
}