import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface User {
  email: string;
  role: string;
}


interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}


const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};


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


export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
