'use client'

import { EnumProductSort, EnumProductSortRus, IProduct, TypePaginationsProducts } from "@/types/product.interface"
import { FC, useEffect, useState } from "react"
import { ProductItem } from "./product-item/product-item"
import { Loader } from "@/components/utils/loader/loader"
import s from './catalog.module.scss'
import { SortDropdown } from "./sort-dropdown/sort-dropdown"
import { Button } from "@/components/utils/button/button"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { productService } from "@/services/product/product.service"
import { Paginator } from "@/components/utils/paginator/paginator"
import { useActions } from "@/hooks/useActions"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { CatalogHeader } from "./catalog-header/catalog-header"
import { useCart } from "@/hooks/useCart"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface ICatalog {
    isLoading?: boolean
    searchTerm: string
    sortType: EnumProductSort
}

export const CatalogPage: FC<ICatalog> = ({sortType, searchTerm}) => {

    const [page, setPage] = useState(1)
    const filter = useTypedSelector(state => state.category.filter)

    const cart = useCart()

    const {data: responce, isLoading, isFetching} = useQuery({
        queryKey: ['products', sortType, page, searchTerm, filter],
        queryFn: () => {
            return productService.getAll({
                sort: sortType,
                page,
                perPage: 10,
                categoryNames: filter,
                searchTerm
            })},
    })

    if (isLoading || isFetching) {
        return <Loader />
    }

    console.log(responce)

    return (
        <section className={s.catalog}>
            <>
                <div className={s.products}>
                    { responce!.products.length ?
                    (
                        responce!.products.map(product => <ProductItem key={product.id} product={product} />)
                    ) : (
                        <div>Продуктов нет</div>
                    )}
                </div>
                <div className={cart.items.length > 0 ? `${s.paginator} ${s.cart}` : s.paginator}>
                    <Paginator 
                        currentPage={page} 
                        pageSize={10} 
                        setPage={setPage} 
                        totalItemsCount={responce!.length} />
                </div>
                {cart.items.length > 0 ? (
                    <Link href={'/cart'} className={s.button}>
                        Перейти к оформлению
                    </Link>
                ) : null}
            </>
        </section>
    )
}