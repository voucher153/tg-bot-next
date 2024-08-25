'use client'

import { useActions } from "@/hooks/useActions"
import { ICategory } from "@/types/category.interface";
import { FC, useEffect, useRef } from "react";
import s from './select.module.scss'
import { Check } from "lucide-react";
import { useTypedSelector } from "@/hooks/useTypedSelector";

export const Select: FC<{category: ICategory}> = ({category}) => {
    
    const {changeFilter} = useActions()
    const filter = useTypedSelector(state => state.category.filter)

    const ref = useRef<HTMLInputElement>(null)

    return (
        <label className={s.label}>
            <span>{category.name}</span>
            <input
                ref={ref}
                className={s.select}
                type="checkbox"
                placeholder={category.name}
                value={category.name}
                onChange={(e) => changeFilter(e.target.value)}
            />
            <Check size={20} className={filter.indexOf(category.name) > -1 ? `${s.checked} ${s.check}` : s.check} />
        
        </label>
    );
}