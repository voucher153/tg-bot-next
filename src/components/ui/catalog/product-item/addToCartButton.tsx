import { useActions } from "@/hooks/useActions"
import { useCart } from "@/hooks/useCart"
import { IProduct } from "@/types/product.interface"
import { Minus, Plus } from "lucide-react"
import { FC } from "react"

export const AddToCartButton: FC<{product: IProduct}> = ({product}) => {
    
    const { addToCart, removeFromCart } = useActions()
    const { items } = useCart()

    const currentElement = items.find(
        cartItem => cartItem.product.id === product.id
    )

    return (
        <div>
                {currentElement ? (
                    <div>
                        <div
                            onClick={() => {
                                currentElement && removeFromCart({id: currentElement.id})
                            }}
                        >
                            <Minus />
                        </div>
                        <div
                            onClick={() => {
                                addToCart({
                                    product,
                                    quantity: 1,
                                    price: product.price
                                })
                            }}
                        >
                            <Plus />
                        </div>
                    </div>
                ) : (
                    <div 
                        onClick={() => {
                            addToCart({
                                product,
                                quantity: 1,
                                price: product.price
                            })
                        }}
                    >
                        Add
                    </div>
                )}
        </div>
    )
}