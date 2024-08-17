'use client'

import s from './home.module.scss'
import { productService } from "@/services/product/product.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { FC, useContext, useEffect, useState } from "react"
import { CatalogPage } from "../catalog/catalog"
import { webAppContext } from "@/app/context"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth/auth.service"
import { TypePaginationsProducts } from "@/types/product.interface"

export const HomePage: FC<TypePaginationsProducts> = ({products, length}) => {
    
    const app = useContext(webAppContext);

    const onClose = () => {
        app.close();
    };

    const { push } = useRouter();

    const { mutate } = useMutation({
        mutationKey: ["logout"],
        mutationFn: () => authService.logout(),
        onSuccess() {
            push("/login");
        },
    });

    const onSub = async () => {
        debugger;
        mutate();
    };

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
        <div className={s.wrapper}>
            <button onClick={onClose}>close</button>
            <button onClick={onSub}>logout</button>
            Home
                <CatalogPage products={products || []} />     
        </div>
    )
}