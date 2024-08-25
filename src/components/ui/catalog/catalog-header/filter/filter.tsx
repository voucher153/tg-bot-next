import { Filter } from "lucide-react"
import s from './filter.module.scss'
import { Dispatch, FC, SetStateAction } from "react"
import { Modal } from "../../sort-dropdown/modal/modal"

interface IFilterPage {
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
}

export const FilterPage: FC<IFilterPage> = ({
    open,
    setOpen
}) => {
    return (
        <>
            <div className={s.filter} onClick={() => setOpen(!open)}>
                <Filter size={24} fill="#2734a3" />
                <span className={s.text}>Фильтры</span>
            </div>
            <Modal 
                modalOpened={open} 
                setOpen={setOpen}
            /> 
        </>
    )
}