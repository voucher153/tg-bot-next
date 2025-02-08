'use client'

import s from './auth-form.module.scss'
import { IAuthForm } from "@/types/auth.interface"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { MenuItem } from "@mui/material"
import { Select } from "../../utils/select/select"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { authService } from "@/services/auth/auth.service"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import { Input } from "../../utils/input/input"
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../../public/img/Frame.svg'

const phoneValidation = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)

export const AuthForm = ({type}: {type: 'register' | 'login'}) => {

    const [typeValue, setTypeValue] = useState('Клиент')

    const formSchema = z.object({
        phone: 
            (typeValue == 'Клиент' ? z.string()
            .min(1, {message: 'Номер телефона обязателен'})
            .regex(phoneValidation, {
                message: 'Неправильный номер телефона'
            }) : z.string()),
        code: z.string(),
        password: z.string(),
        type: z.string().min(1, 'nothing'),
    })

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
            code: '',
            password: ''
        }
    })

    useEffect(() => {
        if (typeValue === 'Клиент') {
            setValue('code', '')
        } else if (typeValue === 'Админ') {
            setValue('password', '')
            setValue('phone', '')
        }
    }, [typeValue])

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
    console.log(errors)
    const onSubmit: SubmitHandler<IAuthForm> = (data) => {
        console.log(data)
        debugger
        mutate(data)
    }

    return (
        <>
            <div className={s['logo-block']}>
                <Image src={logo} alt='logo' className={s.logo} />
            </div>
            <form className={s['form-block']} onSubmit={handleSubmit(onSubmit)}>
                {typeValue === 'Клиент' ? (
                    <Input 
                        name="phone"
                        placeholder="Ваш номер телефона"
                        register={register}
                        type="text"
                        errors={errors}
                    />
                    ) : null}
                <Select 
                        register={register} 
                        setValue={setValue} 
                        typeValue={typeValue} 
                        setTypeValue={setTypeValue} 
                    />
                {typeValue === 'Админ' ? 
                    (<Input 
                        register={register}
                        name="code"
                        type="password"
                        placeholder='Код'
                        errors={errors}
                    />
                    ) : (
                        <>
                            <Input 
                                register={register}
                                name="password"
                                type="password"
                                placeholder='Пароль'
                                errors={errors}
                            />
                            <Link href='/forgot-password' className={s.link}>Забыл пароль</Link>
                        </>
                        
                    )
                }
                {type === 'register' ? (
                    <button className={s.button} type="submit">Зарегистрироваться</button>
                ) : (
                    <button className={s.button} type="submit">Войти</button>
                )}
                <div className={s['move-block']}>
                    {type === 'register' ? 
                        (
                            <>
                                <p>
                                    Вы уже наш клиент?
                                    <Link href='/login' className={s.link}> Войти</Link>
                                </p>
                            </>
                        ) : (
                            <>
                                <p>Хотите стать нашим клиентом?</p>
                                <Link href='/register' className={s.link}>Зарегистрироваться</Link>
                            </>
                        )}
                </div>
            </form>
        </>
    )
}