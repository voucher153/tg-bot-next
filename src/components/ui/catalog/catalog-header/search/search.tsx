'use client'

import { useRouter } from "next/navigation"
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import s from './search.module.scss'
import { Plus } from "lucide-react"

interface ISearch {
    setSearchTerm: Dispatch<SetStateAction<string>>
    searchTerm: string
    hidden?: boolean
}

export const Search: FC<ISearch> = ({setSearchTerm, searchTerm, hidden}) => {

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        ref.current?.blur()
    }, [hidden])

    return (
        <div className={s['input-block']}>
            <input
                ref={ref} 
                type="text" 
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                className={s.input}
            />
            <svg
                onClick={() => setSearchTerm('')} 
                className={s.cross} 
                width="20px" 
                height="20px" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M19 5L4.99998 19M5.00001 5L19 19" stroke="#a0a0a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}