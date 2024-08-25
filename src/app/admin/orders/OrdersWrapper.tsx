'use client'

import { useState } from 'react'
import s from './OrdersWrapper.module.scss'
import { OrdersPage } from './Orders'
import { Search } from '@/components/ui/catalog/catalog-header/search/search'

export const OrdersWrapper = () => {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <>
            <div className={s.search}>
                <Search 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                />
            </div>
            <OrdersPage searchTerm={searchTerm} />
        </>
    )
}