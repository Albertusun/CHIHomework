import axiosInstance from './axiosInstance';

export const addComment = async (exhibitId: number, text: string) => {
    const response = await axiosInstance.post(`/api/exhibits/${exhibitId}/comments`, { text });
    return response.data;
};

export const getComments = async (exhibitId: number) => {
    const response = await axiosInstance.get(`/api/exhibits/${exhibitId}/comments`);
    return response.data;
};

export const deleteComment = async (exhibitId: number, commentId: number) => {
    const response = await axiosInstance.delete(`/api/exhibits/${exhibitId}/comments/${commentId}`);
    return response.data;
};
