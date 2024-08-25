'use client'

import { EnumProductSort, EnumProductSortRus } from "@/types/product.interface"
import s from './sort-dropdown.module.scss'
import { Dispatch, FC, SetStateAction, useState } from "react"
import { ArrowDownUp, ArrowDownWideNarrow } from "lucide-react"
import { Modal } from "./modal/modal"

interface ISortDropdown {
    sortType: EnumProductSort,
    setSortType: Dispatch<SetStateAction<EnumProductSort>>
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
}

export const SortDropdown: FC<ISortDropdown> = ({open, setOpen, sortType, setSortType}) => {

    const checkSort = (sortType: EnumProductSort) => {
        if (sortType == 'high-price') {
            return 'Сначала подороже'
        }
        if (sortType == 'low-price') {
            return 'Сначала подешевле'
        }
        if (sortType == 'newest') {
            return 'Сначала новые'
        }
        if (sortType == 'oldest') {
            return 'Сначала старые'
        }
    }

    return (
        <div className={s['select-block']}>
            {/* <select 
                value={sortType}
                className={s.select}
                onChange={(e) => 
                    setSortType(e.target.value as any)}
            >
                {(
                    Object.keys(EnumProductSortRus) as Array<keyof 
                    typeof EnumProductSortRus>
                ).map(key => {
                    return (
                        <option
                            key={key} 
                            value={EnumProductSort[key]}
                        >
                            {EnumProductSortRus[key]}
                        </option>
                    )
                })}
            </select> */}
            <div className={s.select} onClick={() => setOpen(!open)}>
                <ArrowDownWideNarrow size={25} className={s.icon} />
                <span className={s.text}>{checkSort(sortType)}</span>
            </div>
            <Modal
                modalOpened={open}
                setOpen={setOpen}
                setSortType={setSortType}
                sortType={sortType}
            />
        </div>
    )
}