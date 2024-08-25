'use client'

import Link from "next/link"
import { Dispatch, FC, SetStateAction } from "react"
import s from './nav-item.module.scss'
import { usePathname } from "next/navigation"

interface INavItem {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    item: string, 
    path: string
}

export const NavItem: FC<INavItem> = ({item, path, setIsOpen}) => {
    
    const pathname = usePathname()

    const handleClick = () => {
        setIsOpen(false)
    }

    return (
            <Link 
                href={`/admin/${path}`} 
                className={pathname == `/admin${path}` ? `
                    ${s.item} ${s.path}` :
                    s.item}
                onClick={handleClick}
            >
                {item}
            </Link>
    )
}