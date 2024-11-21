'use client'

import { LayoutGrid, LogOut, ShoppingBag, User } from 'lucide-react'
import s from './footer.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth/auth.service'

export const Footer = () => {
    
    const pathname = usePathname()
    const {push} = useRouter()

    const { mutate } = useMutation({
        mutationKey: ["logout"],
        mutationFn: () => authService.logout(),
        onSuccess() {
            push("/login");
        },
    });

    const onSub = async () => {
        mutate();
    };

    return (
        <nav className={s.nav}>
            <Link href={'/'} className={s.item}>
                <LayoutGrid color={pathname == '/' ? '#3e4bc2' : '#525252'}  />
            </Link>
            <Link href={'/orders'} className={s.item}>
                <ShoppingBag color={pathname == '/orders' ? '#3e4bc2' : '#525252'} />
            </Link>
            <Link href={'/user'} className={s.item}>
                <User color={pathname == '/user' ? '#3e4bc2' : '#525252'} />
            </Link>
            <div onClick={onSub} className={s.item}>
                <LogOut color='#525252' />
            </div>
        </nav>
    )
}