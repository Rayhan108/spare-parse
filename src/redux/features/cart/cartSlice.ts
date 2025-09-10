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
    total: number;
}

const initialState: CartState = {
    products: [],
    total: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: any) => {
            if (!Array.isArray(state.products)) {
                state.products = []; // Safeguard
            }
            const existing = state.products.find((product: any) => product._id === action.payload._id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }
            state.total += action.payload.price;
        },

        removeOne: (state, action: any) => {
            const existing = state.products.find((product: any) => product._id === action.payload._id);
            if (existing && existing.quantity > 1) {
                existing.quantity -= 1;
            } else {
                state.products = state.products.filter((product: any) => product._id !== action.payload._id);
            }
            state.total -= action.payload.price;
        },

        deleteProduct: (state, action: any) => {
            const existing = state.products.find((product: any) => product._id === action.payload._id);

            state.products = state.products.filter((product: any) => product._id !== action.payload._id);

            state.total -= action.payload.price * existing.quantity;
        },

        removeAll: (state, action: any) => {
            const product = action.payload;
            state.products = state.products.filter((p: any) => p._id !== product._id);
            state.total -= product.price * product.quantity;
        },

        makeEmpty: (state) => {
            state.products = [];
            state.total = 0;
        },
    },
});

export const { addToCart, removeOne, deleteProduct, removeAll, makeEmpty } = cartSlice.actions;

export default cartSlice.reducer;
