'use client'

import { useActions } from "@/hooks/useActions"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import s from './filter-modal.module.scss'
import { Select } from "./select/select"
import { Button } from "@/components/utils/button/button"

export const FilterModal = () => {
    const categories = useTypedSelector(state => state.category.categories)

    const {resetFilter} = useActions()

    return (
        <div className={s.modal}>
            <div className={s.header}>
                <span className={s.text}>Категория</span>
                <div className={s.button} onClick={() => resetFilter()}>
                    <Button>
                        Очистить
                    </Button>
                </div>
            </div>  
            <div className={s.options}>
                {categories.map(category => {
                    return (
                        <Select category={category} />
                    )
                })}
            </div>
        </div>
    )
}