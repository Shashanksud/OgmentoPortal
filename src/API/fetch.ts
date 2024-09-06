import { AxiosError } from 'axios';
import axiosInstance from './axiosInstance';
// Error handling function
const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const message =
      error.response?.data?.message ||
      error.response?.statusText ||
      error.message;
    console.error('Axios error:', message);
  } else if (error instanceof Error) {
    console.error('Error:', error.message);
  }
  return Promise.reject(error);
};

// Generic GET function
export const getData = async <T>(endpoint: string): Promise<T> => {
  return axiosInstance
    .get<T>(endpoint)
    .then((response) => Promise.resolve(response.data))
    .catch(handleError);
};

// Generic POST function
export const postData = async <K, T>(endpoint: string, data: K): Promise<T> => {
  return axiosInstance
    .post<T>(endpoint, data)
    .then((response) => Promise.resolve(response.data))
    .catch(handleError);
};

// Generic UPDATE function
export const updateData = async <K, T>(
  endpoint: string,
  data: K
): Promise<T> => {
  return axiosInstance
    .put<T>(endpoint, data)
    .then((response) => Promise.resolve(response.data))
    .catch(handleError);
};

// Generic DELETE function
export const deleteData = async (
  endpoint: string,
  id: string
): Promise<void> => {
  const url = `${endpoint}/${id}`;

  return axiosInstance
    .delete(url)
    .then(() => Promise.resolve())
    .catch(handleError);
};
