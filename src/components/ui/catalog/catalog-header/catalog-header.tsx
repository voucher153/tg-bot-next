'use client'

import { productService } from "@/services/product/product.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { Search } from "./search/search"
import s from './catalog-header.module.scss'
import { ChevronLeft } from "lucide-react"
import { SortDropdown } from "../sort-dropdown/sort-dropdown"
import { EnumProductSort } from "@/types/product.interface"
import { FilterPage } from "./filter/filter"

interface ICatalogHeader {
    setSearchTerm: Dispatch<SetStateAction<string>>
    searchTerm: string
    setSortType: Dispatch<SetStateAction<EnumProductSort>>
    sortType: EnumProductSort
}

export const CatalogHeader: FC<ICatalogHeader> = ({
    searchTerm, 
    setSearchTerm,
    setSortType,
    sortType
}) => {

    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            if (currentScrollPos >= 10 && currentScrollPos > prevScrollPos) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            setOpen(false)
            setOpenFilter(false)
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);


    return (
        <div className={hidden ? `${s['header_hidden']} ${s.header}` : s.header}>
            <div className={s['input-block']}>
                {/* <div>
                    <ChevronLeft className={s.back} />
                </div> */}
                <Search 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                    hidden={hidden} 
                />
            </div>
            <div className={s['low-block']}>
                <SortDropdown 
                    open={open} 
                    setOpen={setOpen} 
                    setSortType={setSortType} 
                    sortType={sortType} 
                />
                <FilterPage 
                    open={openFilter}
                    setOpen={setOpenFilter}
                />
            </div>
        </div>
    )
}