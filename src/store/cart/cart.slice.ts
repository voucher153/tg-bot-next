import { ICartItem } from '@/types/cart.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddToCartPayload, ICartInitialState, IChangeQuantityPayload } from './cart.types';

const initialState: ICartInitialState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: 
            PayloadAction<IAddToCartPayload>) => {
                //state.items.push({...action.payload, id: String(state.items.length)})
                const isExist = state.items.some(item => item.product.id === action.payload.product.id)

                if (!isExist) {
                    state.items.push({...action.payload, id: action.payload.product.id})
                }
        },
        removeFromCart: (state, action: PayloadAction<{id: string}>) => {
            state.items = state.items.filter(item => item.id != action.payload.id)
        },
        changeQuantity: (state, action:
            PayloadAction<IChangeQuantityPayload>) => {
                const { id, type, itemPrice, cratn } = action.payload
                const item = state.items.find(item => item.id === id)
                debugger
                if (item) {
                    if (type === 'plus') {
                        item.quantity += cratn
                        item.price = +item.price + +itemPrice * cratn
                    } else {
                        item.quantity -= cratn
                        item.price = +item.price - +itemPrice
                    }
                }
        },
        reset: state => {
            state.items = []
        },
        setCart: (state, action: PayloadAction<ICartItem[]>) => {
            state.items = [...action.payload]
        }
    }
})
