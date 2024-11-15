// src/api/exhibitActions.ts
import axiosInstance from './axiosInstance';

export const getAllExhibits = async (page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get(`/api/exhibits?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching exhibits:', error);
        throw error;
    }
};


// Fetch user's own posts
export const getMyPosts = async () => {
    return await axiosInstance.get('/api/exhibits/my-posts');
};

// Fetch exhibit by ID
export const getExhibitById = async (id: number) => {
    return await axiosInstance.get(`/api/exhibits/post/${id}`);
};

// Create new exhibit
// src/api/exhibitActions.ts
export const createExhibit = async (formData: FormData) => {
    return await axiosInstance.post('/api/exhibits', formData);
};


// Delete exhibit by ID
export const deleteExhibitById = async (id: number) => {
    return await axiosInstance.delete(`/api/exhibits/${id}`);
};
