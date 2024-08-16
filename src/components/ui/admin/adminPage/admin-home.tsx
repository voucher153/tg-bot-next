import Link from "next/link"
import s from './admin-page.module.scss'

export const AdminPage = () => {
    return (
        <>
            <div className={s.item}>
                <Link href={'/products'} >Продукция</Link>
            </div>
            <div className={s.item}>
                <Link href={'/category'} >Категории</Link>
            </div>
        </>
    )
}