import { cartSlice } from './cart/cart.slice'
import { categorySlice } from './category/category.slice'
import * as userActions from './user/user.actions'


export const rootActions = {
    ...userActions,
    ...cartSlice.actions,
    ...categorySlice.actions
}