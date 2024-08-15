'use client'

import { RefObject, useEffect, useState } from "react"

export const useOutsideClick = (value: boolean, ref: RefObject<HTMLDivElement>) => {
    const [isActive, setIsActive] = useState(value)

    useEffect(() => {
        const handleClick = (e: any) => {
            
            if (ref.current && !ref.current.contains(e.target)) {
                setIsActive(false)
            }
        }

        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [ isActive ])

    return {isActive, setIsActive}
}