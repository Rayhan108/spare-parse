import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { baseApi } from './api/baseApi';
import { authSlice } from './features/auth/authSlice';
import { cartSlice } from './features/cart/cartSlice';
import { wishlistSlice } from './features/wishlist/wishlistSlice';


const persistConfig = {
    key: "ecommerce-hatem",
    storage,
    blacklist: ["baseApi"], // Prevent persisting API cache
};

const rootReducer = combineReducers({
    logInUser: authSlice.reducer,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist actions
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
