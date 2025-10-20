import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define Product type
export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define Cart State type
interface CartState {
  products: Product[];
  total: number;
}

const initialState: CartState = {
  products: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<Product, "quantity">>) => {
      const existing = state.products.find((p) => p._id === action.payload._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },

    removeOne: (state, action: PayloadAction<{ _id: string }>) => {
      const existing = state.products.find((p) => p._id === action.payload._id);
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.products = state.products.filter((p) => p._id !== action.payload._id);
        }
        state.total -= existing.price;
      }
    },

    deleteProduct: (state, action: PayloadAction<{ _id: string }>) => {
      const existing = state.products.find((p) => p._id === action.payload._id);
      if (existing) {
        state.total -= existing.price * existing.quantity;
        state.products = state.products.filter((p) => p._id !== action.payload._id);
      }
    },

    removeAll: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      state.products = state.products.filter((p) => p._id !== product._id);
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
