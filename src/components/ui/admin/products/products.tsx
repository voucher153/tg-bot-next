import { Button } from "@/components/utils/button/button"
import Link from "next/link"

export const ProductsPage = () => {
    return (
        <div>
            <Link href={'/i/products/add'} >
                <Button>
                    Добавить продукт
                </Button>
            </Link>
        </div>
    )
}