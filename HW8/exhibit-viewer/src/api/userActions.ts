import axiosInstance from './axiosInstance';

export const login = async (userData: { username: string; password: string }) => {
    return axiosInstance.post('/api/auth/login', userData);
};

export const register = async (userData: { username: string; password: string }) => {
    return axiosInstance.post('/users/register', userData);
};
