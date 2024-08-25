'use client'

import { AdminList } from "@/components/ui/admin/products/admin-list/admin-list"

import { Paginator } from "@/components/utils/paginator/paginator"
import s from './orders.module.scss'
import { useState } from "react"
import { useAdminOrders } from "./useAdminOrders"
import { Search } from "@/components/ui/catalog/catalog-header/search/search"
import { Loader } from "@/components/utils/loader/loader"

export const OrdersPage = ({searchTerm}: {searchTerm: string}) => {
    
    const [page, setPage] = useState(1)

    const {data, isFetching} = useAdminOrders({page, searchTerm})

    if (isFetching) {
        return <Loader />
    }

    console.log(data)
    return (
        <>
            
            {data?.length! > 0 ?  
            (<>
                <AdminList 
                    isLoading={isFetching}
                    listItems={data}
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
                <div className={s.notFound}>Заказы не найдены</div>
            )}
        </>
    )
}