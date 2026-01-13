import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string;
  role: string;
  image: string;
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
    

    updateTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken?: string;
      }>
    ) => {
      if(action.payload.accessToken){
        state.accessToken = action.payload.accessToken;

      }
      if(action.payload.refreshToken){

        state.refreshToken = action.payload.refreshToken as string;
      }
    },
    
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser, updateTokens, logout } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: { logInUser: AuthState }) =>
  state.logInUser.user;
export const selectAccessToken = (state: { logInUser: AuthState }) =>
  state.logInUser.accessToken;
export const selectRefreshToken = (state: { logInUser: AuthState }) =>
  state.logInUser.refreshToken;
export const selectIsAuthenticated = (state: { logInUser: AuthState }) =>
  !!state.logInUser.accessToken;

export default authSlice.reducer;