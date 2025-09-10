/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

// Define the types for the product and the state
// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

interface CartState {
    products: any;
}

const initialState: CartState = {
    products: [],
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addRemoveToWishlist: (state, action: any) => {
            const existing = state.products.find((product: any) => product._id === action.payload._id);
            if (existing) {
                state.products = state.products.filter((product: any) => product._id !== action.payload._id);
            } else {
                state.products.push(action.payload);
            }
        },

        deleteFromWishlist: (state, action: any) => {
            state.products = state.products.filter((product: any) => product._id !== action.payload._id);
        },

        makeWishlistEmpty: (state) => {
            state.products = [];
        },
    },
});

export const { addRemoveToWishlist, deleteFromWishlist, makeWishlistEmpty } = wishlistSlice.actions;

export default wishlistSlice.reducer;
