'use client'

import { useQuery } from '@tanstack/react-query'
import s from './orders.module.scss'
import { orderService } from '@/services/order/order.service'
import { Order } from './order/order'
import { Loader } from '@/components/utils/loader/loader'

export const OrdersPage = () => {
    
    const {data: responce, isLoading} = useQuery({
        queryKey: ['orders'],
        queryFn: () => orderService.getByUserId(),
    })

    if (isLoading) {
        return <Loader />
    }

    console.log(responce)

    return (
        <div className={s.wrapper}>
            <div className={s.head}>
                <span>Ваши Заказы</span>
                <div className={s.amount}>Найдено {responce?.data.length} заказов</div>
            </div>
            <div className={s.orders}>
                <div className={s['first-table']}>
                    <span>Дата</span>
                    <span>Статус</span>
                </div>
                <div className={s.items}>
                    {responce?.data.length! > 0 ? 
                    (
                        responce?.data.map(order => {
                            return (
                                <div className={s.order}>
                                    <Order key={order.id} order={order} />
                                </div>
                                
                            )
                    })) : (
                        <div className={s.no}>
                            Заказов нет
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}