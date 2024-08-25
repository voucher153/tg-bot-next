'use client'

import { EnumProductSort, EnumProductSortRus } from "@/types/product.interface"
import { Dispatch, FC, SetStateAction } from "react"
import s from './modal.module.scss'
import { Sort } from "./sort/sort"
import { FilterModal } from "./filter-modal/filter-modal"

interface IModal {
    modalOpened: boolean
    sortType?: EnumProductSort,
    setSortType?: Dispatch<SetStateAction<EnumProductSort>>
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const Modal: FC<IModal> = ({
    modalOpened, 
    setSortType, 
    sortType, 
    setOpen
}) => {

    return (
        <div className={modalOpened ? s.modalOpened : s.modal} onClick={() => setOpen(false)}>
            <div 
                className={modalOpened ? `${s.content} ${s.opened}` : s.content}
                onClick={e => e.stopPropagation()}
            >
                {setSortType && sortType ? 
                    <Sort setSortType={setSortType} sortType={sortType} /> : 
                    <FilterModal />
                }
            </div>
        </div>
    )
}