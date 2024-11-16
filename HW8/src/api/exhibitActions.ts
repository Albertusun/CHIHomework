import axios from 'axios';

const API_BASE_URL =
  'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/api/exhibits';

export const fetchExhibits = async (page: number, limit: number) => {
  const response = await axios.get(
    `${API_BASE_URL}?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const fetchComments = async (exhibitId: number) => {
  const response = await axios.get(`${API_BASE_URL}/${exhibitId}/comments`);
  return response.data;
};
