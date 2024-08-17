
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistStore, PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist'

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from './user/user.slice';
import { cartSlice } from './cart/cart.slice';

const isClient = typeof window != 'undefined'

const combinedReducers = combineReducers({
    cart: cartSlice.reducer,
    user: userSlice.reducer
})

let mainReducer = combinedReducers

if (isClient) {
    // const { persistReducer } = require('redux-persist')
    // const storage = require('redux-persist/lib/storage').default
    
    // const persistConfig = {
    //     key: "telegramBot",
    //     storage,
    //     whiteList: ['cart']
    // }

    // mainReducer = persistReducer(persistConfig, combinedReducers)
}

export const makeStore = () => configureStore({
    reducer: mainReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

//export const persister = persistStore(makeStore())

export type AppStore = ReturnType<typeof makeStore>
export type TypeRootState = ReturnType<typeof mainReducer>