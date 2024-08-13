
import {
    FLUSH,
    PAUSE,
    PERSIST, persistReducer,
    persistStore, PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from './user/user.slice';
import { cartSlice } from './cart/cart.slice';

const persistConfig = {
    key: "telegramBot",
    storage,
    whiteList: ['cart']
}

const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    user: userSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export const persister = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>