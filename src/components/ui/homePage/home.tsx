'use client'

import s from './home.module.scss'
import { productService } from "@/services/product/product.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { FC, useContext, useEffect, useState } from "react"
import { CatalogPage } from "../catalog/catalog"
import { webAppContext } from "@/app/context"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth/auth.service"
import { EnumProductSort, TypePaginationsProducts } from "@/types/product.interface"
import { CatalogHeader } from '../catalog/catalog-header/catalog-header'
import { ICategory } from '@/types/category.interface'
import { useActions } from '@/hooks/useActions'
import { LayoutGrid } from 'lucide-react'
import { Footer } from '@/components/utils/footer/footer'

interface IHomePage extends TypePaginationsProducts {
    categories: ICategory[]
}

export const HomePage: FC<IHomePage> = ({products, length, categories}) => {

    const { push } = useRouter();

    const {addCategories} = useActions()

    useEffect(() => {
        addCategories(categories)
    }, [])

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [sortType, setSortType] = useState<EnumProductSort>(EnumProductSort.NEWEST)

    return (
        <>
            <CatalogHeader 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                setSortType={setSortType}
                sortType={sortType}
            />
            <div className={s.wrapper}>
                <CatalogPage 
                    searchTerm={searchTerm} 
                    data={{products, length}} 
                    sortType={sortType}
                />     
            </div>
        </>
    )
}