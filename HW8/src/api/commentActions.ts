import axiosInstance from './axiosInstance';

const BASE_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/api';

export const fetchComments = async (postId: number) => {
  const { data } = await axiosInstance.get(
    `${BASE_URL}/exhibits/${postId}/comments`
  );
  return data;
};

export const addComment = async (postId: number, text: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/api/exhibits/${postId}/comments`,
      { text }
    );
    return data;
  } catch (error) {
    console.error('Failed to add comment:', error);
    throw error;
  }
};
