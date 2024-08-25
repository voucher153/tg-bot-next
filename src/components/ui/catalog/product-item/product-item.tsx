import { useActions } from "@/hooks/useActions";
import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/types/product.interface";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import s from './product-item.module.scss'

export const ProductItem: FC<{product: IProduct}> = ({product}) => {
    
    const { addToCart, removeFromCart, changeQuantity } = useActions()
    const { items } = useCart()

    const currentElement = items.find(
        cartItem => cartItem.product.id === product.id
    )

    return (
        <div className={s['item-wrapper']}>
            {product.new ? (
                <div className={s.new}>
                    NEW
                </div>
            ) : null}
            <div className={s.price}>
                {product.price} ₽
            </div>
            <div className={s['img-block']}>
                <Image 
                    src={product.imageUrl} 
                    width={130} 
                    height={40} 
                    alt={product.name} 
                    className={s.img}
                />
            </div>
            <div className={s.name}>
                {product.name}
            </div>
            <div>
                {/* <button
                    onClick={() => 
                        currentElement
                            ? removeFromCart({id: currentElement.id})
                            : addToCart({
                                product,
                                quantity: 1,
                                price: product.price
                            })
                    }
                > */}
                    
                        <div className={s.buttons}>
                            <div
                                className={currentElement ? s.added : s.add}
                                onClick={() => {
                                    currentElement ? 
                                        null :
                                        addToCart({
                                            product,
                                            quantity: 1,
                                            price: product.price
                                        })
                                }}
                            >
                                {currentElement ? (
                                    <div className={s.change}>
                                        <div
                                            className={s.minus}
                                            onClick={() => {
                                                currentElement.quantity == 1 ? 
                                                    (
                                                        removeFromCart({id: currentElement.id})
                                                    ) : (changeQuantity({id: currentElement.id, type: 'minus', itemPrice: product.price})
                                                    )
                                            }}
                                        >
                                            <Minus />
                                        </div>
                                        {currentElement && (
                                            <div className={s.quanity}>
                                                {currentElement.quantity}
                                            </div>
                                        )}
                                        <div 
                                            className={s.plus}
                                            onClick={() => {
                                                changeQuantity({id: currentElement.id, type: 'plus', itemPrice: product.price})
                                            }}
                                        >
                                            <Plus />
                                        </div>
                                    </div>
                                ) : (
                                    <span className={s['add-text']}>Добавить</span>
                                )}
                            </div>
                        </div>
                {/* </button> */}
            </div>
        </div>
    )
}