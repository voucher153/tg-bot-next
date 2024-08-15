'use client'

import { useEffect, useRef, useState } from 'react'
import s from './select.module.scss'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import clsx from 'clsx'
import { ISelect } from './select.interface'
import { convertAuthTypeValue } from '../convertAuthType/convertAuthType'

export const Select = ({register, setValue, typeValue, setTypeValue}: ISelect) => {
    
    useEffect(() => {}, [typeValue])

    const inputRef = useRef<HTMLInputElement>(null)

    const {isActive, setIsActive} = useOutsideClick(false, inputRef)
    
    const handleClick = () => {
        setIsActive(!isActive)
    }

    const handleChangeSelect = (target: any) => {
        debugger
        setTypeValue(target.innerHTML)
        setValue('type', convertAuthTypeValue(target.innerHTML))
    }

    return (
        <div className={s['select-block']}>
            <input 
                {...register('type')}
                className={s.select} 
                name='type'
                type='text' 
                defaultValue={typeValue}
                //value={typeValue}
                ref={inputRef} 
                onClick={handleClick} 
                onMouseDown={e => e.preventDefault()}
            />
            <div className={isActive ? s['dropdown-visible'] : s['dropdown']}>
                <ul>
                    <li 
                        className={s['select-dropdown-text']} 
                        onClick={(e) => {
                            e.preventDefault()
                            handleChangeSelect(e.target)
                        }}
                    >
                        Клиент
                    </li>
                    <li 
                        className={s['select-dropdown-text']} 
                        onClick={(e) => {
                            e.preventDefault()
                            handleChangeSelect(e.target)
                        }}
                    >
                        Админ
                    </li>
                </ul>
            </div>
        </div>
    )
}