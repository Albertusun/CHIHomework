import axios from 'axios';

const BASE_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/api';

export const fetchPosts = async (page: number = 1, limit: number = 10) => {
  const { data } = await axios.get(
    `${BASE_URL}/exhibits?page=${page}&limit=${limit}`
  );
  return data.data; // Возвращаем только массив постов
};

export const fetchComments = async (postId: number) => {
  const { data } = await axios.get(`${BASE_URL}/exhibits/${postId}/comments`);
  return data; // Возвращаем массив комментариев
};
