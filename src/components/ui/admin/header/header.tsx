'use client'

import { NavBar } from "./navbar/navbar"
import s from './header.module.scss'
import { useState } from "react"
import { Menu, X } from "lucide-react"

export const Header = () => {
    
    const [open, setIsOpen] = useState(false)

    return (
        <>
            <div className={s.wrapper}>
                <span className={s.text}>Админ Панель</span>
                <div className={s.menu} onClick={() => setIsOpen(!open)}>
                    {open ? <X /> : <Menu /> }
                </div>
            </div>
            <div className={open ? s.open : s.navbar}>
                <NavBar setIsOpen={setIsOpen} />
            </div>
        </>
    )
}