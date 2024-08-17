import { LoaderCircle } from "lucide-react"
import s from './loader.module.scss'

export const Loader = () => {
    return (
        <LoaderCircle className={s.loader} />
    )
}