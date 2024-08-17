import { IProduct } from "@/types/product.interface"
import { FC } from "react"
import { ProductItem } from "./product-item/product-item"
import { Loader } from "@/components/utils/loader/loader"
import s from './catalog.module.scss'

export const CatalogPage: FC<{products: IProduct[], isLoading?: boolean}> = ({products, isLoading}) => {
    
    if (isLoading) {
        return <Loader />
    }

    console.log(products)

    return (
        <section className={s.catalog}>
            { products.length ?
            (
                products.map(product => <ProductItem key={product.id} product={product} />)
            ) : (
                <div>Продуктов нет</div>
            )}
        </section>
    )
}