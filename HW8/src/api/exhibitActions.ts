import axiosInstance from './axiosInstance';

const BASE_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/api';

export const fetchPosts = async (page: number = 1, limit: number = 10) => {
  const { data } = await axiosInstance.get(
    `${BASE_URL}/exhibits?page=${page}&limit=${limit}`
  );
  return data.data;
};
