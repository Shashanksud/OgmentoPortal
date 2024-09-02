import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error(
      'Axios error:',
      error.response?.data?.message || error.message
    );
  } else if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('An unknown error occurred:', error);
  }
};

export const getData = async <T>(endpoint: string): Promise<T[]> => {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await axios.get<T[]>(url);
    return response.data;
  } catch (error: unknown) {
    handleError(error);
    throw new Error('Failed to fetch data');
  }
};

// Generic POST function
export const postData = async <K, T>(endpoint: string, data: K): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await axios.post<T>(url, data);
    return response.data;
  } catch (error: unknown) {
    handleError(error);
    throw new Error('Failed to create data');
  }
};

// Generic UPDATE function
export const updateData = async <T>(endpoint: string, data: T): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await axios.put<T>(url, data);
    return response.data;
  } catch (error: unknown) {
    handleError(error);
    throw new Error('Failed to update data');
  }
};
export const deleteData = async (
  endpoint: string,
  id: string
): Promise<void> => {
  const url = `${BASE_URL}${endpoint}/${id}`;

  try {
    await axios.delete(url);
  } catch (error: unknown) {
    handleError(error);
    throw new Error('Failed to delete data');
  }
};
