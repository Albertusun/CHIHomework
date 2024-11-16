import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  accessToken: localStorage.getItem('token'), // Загружаем токен из localStorage
  refreshToken: null,
  isAuthenticated: !!localStorage.getItem('token'), // Устанавливаем авторизацию
  error: null,
};

// Async action для логина
export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/api/auth/login',
        credentials
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

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
      localStorage.removeItem('token'); // Удаляем токен из localStorage
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
        localStorage.setItem('token', action.payload.access_token); // Сохраняем токен в localStorage
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
