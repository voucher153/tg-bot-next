import { EnumProductSort, EnumProductSortRus } from "@/types/product.interface";
import { Dispatch, FC, SetStateAction } from "react";
import s from './sort.module.scss'

interface ISort {
    sortType: EnumProductSort,
    setSortType: Dispatch<SetStateAction<EnumProductSort>>
}

export const Sort: FC<ISort> = ({sortType, setSortType}) => {
    return (
        <>
            <span className={s.text}>Какие товары показывать сначала</span>
            {(
            Object.keys(EnumProductSortRus) as Array<
                keyof typeof EnumProductSortRus
            >
            ).map((key) => {
            return (
                <option
                    key={key}
                    value={EnumProductSort[key]}
                    onClick={() => setSortType(EnumProductSort[key])}
                    className={EnumProductSort[key] === sortType ?
                        `${s.option} ${s.selected}` :
                        s.option
                    }
                >
                {EnumProductSortRus[key]}
                </option>
            );
            })}
        </>
    );
}