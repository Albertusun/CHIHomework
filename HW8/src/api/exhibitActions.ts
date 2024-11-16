import axiosInstance from './axiosInstance';

const BASE_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/api';

export const fetchPosts = async (
  page: number = 1,
  isMyPosts: boolean = false
) => {
  const endpoint = isMyPosts ? '/exhibits/my-posts' : '/exhibits';
  const { data } = await axiosInstance.get(
    `${BASE_URL}${endpoint}?page=${page}`
  );
  return data.data;
};

export const uploadPost = async (formData: FormData) => {
  const { data } = await axiosInstance.post(`${BASE_URL}/exhibits`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const deletePost = async (postId: string) => {
  const { data } = await axiosInstance.delete(`${BASE_URL}/exhibits/${postId}`);
  return data;
};
