import { IOrder } from "@/types/order.interface"
import { FC } from "react"
import s from './more-info.module.scss'
import { CartItem } from "@/components/ui/cart/cart-item/cart-item"
import { OrderProducts } from "@/components/ui/cart/products/products"

export const MoreInfo: FC<{order: IOrder, date: string}> = ({order, date}) => {
    
    let id: string = ''

    let fullPrice: number = 0

    order.items.forEach(item => fullPrice += +item.price)

    if (order.id.length > 8) {
        id = order.id.slice(0, 8) + '...'
    } else {
        id = order.id
    }

    const checkStatus = () => {
        if (order.status === 'new_order') {
            return 'Новый заказ'
        }
        return 'Заказ принят'
    }

    return (
        <div className={s.wrapper}>
            <div className={s.head}>
                <div className={s.id}>
                    ID Заказа: {order.id}
                </div>
                <div className={s['addit-info']}>
                    <span className={s.date}>Дата заказа:</span> 
                    <span className={s['date-num']}>{date.slice(0, 3) + date.slice(6)}</span>
                    {/* <span>|</span> */}
                    <div className={s['status-block']}>
                        <span className={checkStatus() == 'Новый заказ' ?
                            `${s.status} ${s.new}` :
                            `${s.status} ${s.accept}`
                        }>Статус: {checkStatus()}</span>
                    </div>
                </div>
            </div>
            <div className={s.items}>
                <OrderProducts items={order.items} orderPage />
            </div>
            <div className={s.result}>
                Итого: {fullPrice}₽
            </div>
        </div>
    )
}