'use client'

import { AdminList } from "@/components/ui/admin/products/admin-list/admin-list"
import { useAdminCategories } from "./useAdminCategories"
import { Paginator } from "@/components/utils/paginator/paginator"
import s from './categories.module.scss'
import { useState } from "react"
import { Loader } from "@/components/utils/loader/loader"
import { Open } from "./edit/Open/open"

export const CategoriesPage = () => {
    const {data, isFetching, mutate, refetch} = useAdminCategories()

    if (isFetching) {
        return <Loader />
    }

    return (
        <div className={s.wrapper}>
            <Open refetch={refetch} />
            <AdminList 
                isLoading={isFetching}
                listItems={data}
                removeHandler={mutate}
            />
            {/* <div className={s.paginator}>
                <Paginator
                    pageSize={10}
                    setPage={setPage}
                    totalItemsCount={data?.length}
                    currentPage={page} 
                />
            </div> */}
        </div>
    )
}