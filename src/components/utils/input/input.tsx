'use client'

import clsx from "clsx"
import { IInput } from "./input.interface"
import s from "./input.module.scss"
import { useState } from "react"
import Image from "next/image"
import show from '../../../../public/img/eye-password-show-svgrepo-com.svg'
import hide from '../../../../public/img/eye-password-hide-svgrepo-com.svg'

export const Input = ({register, name, type, placeholder, defaultValue="", errors}: IInput) => {
    
    const [active, setActive] = useState(false)
    
    const error = errors?.[name]?.message as string | undefined

    const handleClick = () => {
        setActive(!active)
    }

    const checkType = (type: string, name: 'code' | 'type' | 'company' | 'phone' | "username" | "password", active: boolean) => {
        if (name === 'code') {
            if (active) {
                return 'text'
            }
        }
        return type
    }

    const checkName = () => {
        if (name === 'code') {
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
    }

    return (
        <div className={s['input-block']}>
            
            <input 
                {...register(name)}
                name={name}
                type={checkType(type, name, active)}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className={name === 'code' ? 
                    !active ?
                        (`${s['input-code']} ${s.input}`) :
                        (`${s['input-code_active']} ${s.input}`)
                    :
                    s.input}
            />
            <div className={s.error}>{error}</div>
            {checkName()}
        </div>
    )
}