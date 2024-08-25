'use client'

import { AdminList } from "@/components/ui/admin/products/admin-list/admin-list"
import { useAdminProducts } from "./useAdminProducts"
import { Paginator } from "@/components/utils/paginator/paginator"
import s from './products.module.scss'
import { useState } from "react"
import { Search } from "@/components/ui/catalog/catalog-header/search/search"
import { Loader } from "@/components/utils/loader/loader"
import { Open } from "./Open/open"

export const ProductsPage = ({searchTerm}: {searchTerm: string}) => {

    const [page, setPage] = useState(1)
    const {data, isFetching, mutate, refetch} = useAdminProducts({page, searchTerm})

    if (isFetching) {
        return <Loader />
    }

    return (
        <div className={s.wrapper}>
            <Open refetch={refetch} />
            {data?.length! > 0 ?  
            (<>
                <AdminList 
                    isLoading={isFetching}
                    listItems={data}
                    removeHandler={mutate}
                />
                <div className={s.paginator}>
                    <Paginator
                        pageSize={20}
                        setPage={setPage}
                        totalItemsCount={data![0].length!}
                        currentPage={page} 
                    />
                </div>
            </>) : (
                <div className={s.notFound}>Продукты не найдены</div>
            )}
        </div>
    )
}