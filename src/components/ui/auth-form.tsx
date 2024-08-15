'use client'

import { IAuthForm } from "@/types/auth.interface"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { MenuItem } from "@mui/material"
import { Select } from "../utils/select/select"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { authService } from "@/services/auth/auth.service"
import { toast } from "sonner"
import { isAxiosError } from "axios"

const phoneValidation = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)

const formSchema = z.object({
    company: z.string().min(1, {message: 'Название компании обязательно'}),
    phone: 
        z.string()
        .min(1, {message: 'Номер телефона обязателен'})
        .regex(phoneValidation, {
            message: 'Неправильный номер телефона'
        }),
    code: z.string(),
    type: z.string().min(1, 'nothing'),
    username: z.string().min(1, 'nothing')
})

export const AuthForm = ({type}: {type: 'register' | 'login'}) => {

    const [typeValue, setTypeValue] = useState('Клиент')

    const {
        register, 
        handleSubmit, 
        formState: {errors},
        reset,
        control,
        setValue
    } = useForm<IAuthForm>({
        mode: 'all',
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: 'user',
            code: ''
        }
    })

    const {push} = useRouter()

    const {mutate} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) => authService.main(type, data),
        onSuccess() {
            debugger
            toast.success(type === 'login' ?
                'Вы вошли' :
                'Аккаунт создан'
            )
            reset()
            setTypeValue('Клиент')
            push('/')
        },
        onError(error) {
            debugger
            if (isAxiosError(error)) {
                toast.error(error.response?.data!.message)
            }
        }
    })

    const onSubmit: SubmitHandler<IAuthForm> = (data) => {
        console.log(data)
        mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                {...register('company')}
                type="text"
                placeholder="company"
                />
            <input 
                {...register('phone')}
                type="text"
                placeholder="phone"
                />
            <input 
                {...register('username')}
                type="text"
                placeholder="user"
                />
            <Select 
                register={register} 
                setValue={setValue} 
                typeValue={typeValue} 
                setTypeValue={setTypeValue} 
            />
            {typeValue === 'Админ' ? 
                (<input 
                    {...register('code')}
                    type="text"
                    placeholder="code"
                    />
                ) : null
            }
            <button type="submit">Submit</button>
        </form>
    )
}