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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {z} from "zod"
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/de';

interface ICartForm {
    date: Dayjs
    company: string
    address: string
    //status: string
    //items: ICartItemPost[]
}

export const CartPage = () => {

    const itemsSchema = z.object({
        productId: z.string(),
        price: z.number(),
        quantity: z.number()
    })

    const formSchema = z.object({
        date: z.instanceof(dayjs as unknown as typeof Dayjs, {message: 'Обязательное поле'}),
        company: z.string().min(1, {message: 'Обязательное поле'}),
        address: z.string().min(1)
        // status: z.string(),
        // items: z.array(itemsSchema)
    })

    const {
        register,
        control,
        formState: {errors},
        handleSubmit
    } = useForm<ICartForm>({
        mode: 'all',
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: '',
            company: '',
            address: '',
        }
    })

    

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

    const onSubmit: SubmitHandler<ICartForm> = (data) => {
        const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
        const date = `${data.date.date()} ${months[data.date.month()]} ${data.date.year()} года` 
        const newData = {
            date,
            items,
            status: 'new_order',
            company: data.company,
            address: data.address,
        }
        console.log(newData)
        try {
            mutate(newData)
            reset()
        } catch (err) {
            alert(err)
        }
    }

    const items: ICartItemPost[] = cart.items.map(item => {
        return {
            productId: item.product.id,
            price: item.price,
            quantity: item.quantity
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.wrapper}>
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
                        <span className={s.price}>{price.toFixed(2)}₽</span>
                    </div>
                </div>
                <div className={s.form}>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
                            <Controller
                                control={control}
                                name="date"
                                rules={{ required: true }}
                                render={({ field }) => {
                                    return (
                                        <DatePicker
                                            label="Дата доставки"
                                            
                                            inputRef={field.ref}
                                            onChange={(date) => {
                                            field.onChange(date);
                                            }}
                                        />
                                        );
                                    }}
                            />
                        </LocalizationProvider>
                        <div className={s.error}>{errors.date?.message}</div>
                    </div>
                    <div>
                        <input 
                            {...register('company', {required: true})}
                            className={s.input}
                            placeholder='Юридическо лицо (ИП)'
                        />
                        <div className={s.error}>{errors.company?.message}</div>
                    </div>
                    <div className={s.adrs}>
                        <input 
                            {...register('address', {required: true})}
                            className={s.input}
                            placeholder='Адрес доставки'
                        />
                        <div className={s.error}>{errors.address?.message}</div>
                        <div className={s.shablon}>Шаблон адреса: Страна, регион, город, улица, дом, корп. и т.д</div>
                    </div>
                </div>
            </div>
            <button className={s.button}>
                Заказать
            </button>
        </form>
    )
}