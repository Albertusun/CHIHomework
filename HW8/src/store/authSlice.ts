import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../api/userActions';

interface AuthState {
  userName: string | null;
  userId: number | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userName: null,
  userId: null,
  accessToken: localStorage.getItem('token'),
  refreshToken: null,
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.userName = null;
      state.userId = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    restoreSession(state) {
      const token = localStorage.getItem('token');
      if (token) {
        state.accessToken = token;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userName = action.payload.userName;
        state.userId = action.payload.userId;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userName = action.payload.userName;
        state.userId = action.payload.userId;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
