'use client'

import { productService } from "@/services/product/product.service"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const HomePage = () => {
    
    const {data, isLoading, isSuccess} = useQuery({
        queryKey: ['products'],
        queryFn: () => productService.getAll()
    })

    console.log(data)

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div>
            Home
        </div>
    )
}