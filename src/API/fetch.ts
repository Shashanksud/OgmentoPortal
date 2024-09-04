import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message ||
      error.response?.statusText ||
      error.message;
    console.error('Axios error:', message);
  } else if (error instanceof Error) {
    console.error('Error:', error.message);
  }
};

// Generic GET function
export const getData = async <T>(endpoint: string): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;

  return axios
    .get<T>(url)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(handleError(error)));
};

// Generic POST function
export const postData = async <K, T>(endpoint: string, data: K): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;

  return axios
    .post<T>(url, data)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(handleError(error)));
};

// Generic UPDATE function
export const updateData = async <T>(endpoint: string, data: T): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;

  return axios
    .put<T>(url, data)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(handleError(error)));
};

// Generic DELETE function
export const deleteData = async (
  endpoint: string,
  id: string
): Promise<void> => {
  const url = `${BASE_URL}${endpoint}/${id}`;

  return axios
    .delete(url)
    .then(() => Promise.resolve())
    .catch((error) => Promise.reject(handleError(error)));
};
