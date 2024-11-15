import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userActions from '../../api/userActions';

interface User {
    username: string;
    password: string;
}

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
};

export const login = createAsyncThunk('user/login', async (userData: User) => {
    const response = await userActions.login(userData);
    return response.data;
});

export const register = createAsyncThunk('user/register', async (userData: User) => {
    const response = await userActions.register(userData);
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
            });
    },
});

export default userSlice.reducer;
