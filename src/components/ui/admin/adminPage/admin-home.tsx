import Link from "next/link"
import s from './admin-page.module.scss'
import { Button } from "@/components/utils/button/button"
import Products from "@/app/admin/products/page"

export const AdminPage = () => {
    return (
        <div className={s.block}>
            <Products />
        </div>
    )
}