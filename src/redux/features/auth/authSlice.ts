import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ------------------- User type -------------------
export interface User {
  email: string;
  role: "BUYER" | "SELLER" | "ADMIN";
}

// ------------------- Auth state -------------------
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

// ------------------- Initial state -------------------
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

// ------------------- Slice -------------------
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

// ------------------- Exports -------------------
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
