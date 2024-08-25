'use client'

import Link from "next/link"
import { NavItem } from "./nav-item/nav-item"
import s from './navbar.module.scss'
import { Dispatch, FC, SetStateAction } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { authService } from "@/services/auth/auth.service"

interface INavBar {
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const NavBar: FC<INavBar> = ({setIsOpen}) => {
    
    const {push} = useRouter()

    const { mutate } = useMutation({
        mutationKey: ["logout"],
        mutationFn: () => authService.logout(),
        onSuccess() {
            push("/login");
        },
    });

    const onLogOut = () => {
        mutate()
    }

    
    return (
        <div className={s.wrapper}>
            <ul className={s.items}>
                <NavItem setIsOpen={setIsOpen} path="" item="Продукты"  />
                <NavItem setIsOpen={setIsOpen} path="/categories" item="Категории" />
                <NavItem setIsOpen={setIsOpen} path="/orders" item="Заказы" />
                <div className={s.item} onClick={onLogOut}>
                    Выйти
                </div>
            </ul>
        </div>
    )
}