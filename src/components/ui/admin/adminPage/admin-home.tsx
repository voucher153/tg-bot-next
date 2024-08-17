import Link from "next/link"
import s from './admin-page.module.scss'
import { Button } from "@/components/utils/button/button"

export const AdminPage = () => {
    return (
        <div className={s.block}>
            <div className={s.item}>
                <Link href={'/i/products'} className={s.link} >
                    <Button>
                        Продукция
                    </Button>
                </Link>
            </div>
            <div className={s.item}>
                <Link href={'/i/category'} className={s.link} >
                    <Button>
                        Категории
                    </Button>
                </Link>
            </div>
        </div>
    )
}