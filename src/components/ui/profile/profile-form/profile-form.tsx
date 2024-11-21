'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { IUserUpdate } from "../profile.interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { userService } from "@/services/user/user.service"
import { toast } from "sonner"
import s from './profile-form.module.scss'
import { useState } from "react"
import { isAxiosError } from "axios"
import { ArrowBigLeft, ArrowLeft, ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const phoneValidation = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)

export const ProfileForm = ({phone}: {phone: string}) => {
    
    const [active, setActive] = useState(false)

    const handleClick = () => {
        setActive(!active)
    }

    const formSchema = z.object({
        phone: 
            z.string()
            .min(1, {message: 'Номер телефона обязателен'})
            .regex(phoneValidation, {
                message: 'Неправильный номер телефона'
            }),
        password: z.string(),
    })
    
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        reset,
        control,
        setValue
    } = useForm<IUserUpdate>({
        mode: 'all',
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone
        }
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ['updateProfile'],
        mutationFn: (data: IUserUpdate) => userService.update(data),
        onSuccess() {
            toast.success('Профиль обновлен!')
        },
        onError(error) {
            debugger
            if (isAxiosError(error)) {
                toast.error(error.response?.data!.message)
            }
        }
    })

    const onSubmit: SubmitHandler<IUserUpdate> = (data) => {
        console.log(data)
        debugger
        mutate(data)
    }

    const checkName = () => {
            if (active) {
                return (
                    <svg 
                        className={`${s.show} ${s.eye}`} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleClick}
                    >
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                )
            }
            return (
                <svg 
                    className={`${s.hide} ${s.eye}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleClick}
                >
                    <path d="M2 2L22 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            )
        }

    const {back} = useRouter()

    return (
        <div className={s.block}>
            <div className={s.arrow} onClick={back}>
                <ArrowLeftIcon color="#3e4bc2" />
            </div>
            <form className={s['profile-form']} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input 
                        {...register('phone', {required: true})}
                        className={s.input}
                        placeholder='Телефон'
                    />
                    <div className={s.error}>{errors.phone?.message}</div>
                </div>
                <div className={s['input-block']}>
                    <input 
                        {...register('password', {required: true})}
                        className={!active ?
                            (`${s['input-code']} ${s.input}`) :
                            (`${s['input-code_active']} ${s.input}`)
                        }
                        placeholder='Пароль'
                        type={active ? 'text' : 'password'}
                    />
                    {checkName()}
                    <div className={s.error}>{errors.password?.message}</div>
                </div>
                <button className={s.button} type="submit">Применить</button>
            </form>
        </div>
        
    )
}