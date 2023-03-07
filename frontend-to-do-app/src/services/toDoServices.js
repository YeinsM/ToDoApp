import axios from 'axios';

const BASE_URL = 'http://localhost:5258/api';

export const get = async () => {
  const response = await axios.get(`${BASE_URL}/tasks`);
  return response.data;
};

export const post = async (task) => {
  const response = await axios.post(`${BASE_URL}/tasks`, task);
  return response.data;
};

export const put = async (taskId, task) => {
    debugger;
  const response = await axios.put(`${BASE_URL}/tasks/${taskId}`, task);
  return response.data;
};

export const del = async (taskId) => {
  const response = await axios.delete(`${BASE_URL}/tasks/${taskId}`);
  return response.data;
};