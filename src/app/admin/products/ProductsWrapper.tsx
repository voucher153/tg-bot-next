'use client'

import { useState } from 'react'
import { Search } from '@/components/ui/catalog/catalog-header/search/search'
import { ProductsPage } from './Products'
import s from './ProductsWrapper.module.scss'
import { useMutation } from '@tanstack/react-query'
import { productService } from '@/services/product/product.service'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Open } from './Open/open'

export const ProductsWrapper = () => {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <>
            <div className={s.search}>
                <Search 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                />
            </div>
            <ProductsPage searchTerm={searchTerm} />
        </>
    )
}