import { AxiosError } from 'axios';
import { axiosInstance } from './axiosInstance';

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
export const getData = async <Response>(
  endpoint: string,
  customHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  },
  withAuth = true
): Promise<Response> => {
  return axiosInstance
    .get<Response>(endpoint, {
      headers: { ...customHeaders, ...(withAuth ? undefined : {}) },
      withCredentials: !!withAuth,
    })
    .then((response) => Promise.resolve(response.data))
    .catch(handleError);
};

// Generic POST function
export const postData = async <Request, Response>(
  endpoint: string,
  data: Request,
  customHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  },
  withAuth = true
): Promise<Response> => {
  return axiosInstance
    .post<Response>(endpoint, data, {
      headers: { ...customHeaders, ...(withAuth ? undefined : {}) },
      withCredentials: !!withAuth,
    })
    .then((response) => Promise.resolve(response.data))
    .catch(handleError);
};
// export const postFormData = async <Request, Response>(
//   endpoint: string,
//   data: Request,
//   withAuth = true
// ): Promise<Response> => {
//   return axiosInstanceWithFormData
//     .post<Response>(endpoint, data, {
//       headers: withAuth ? undefined : {},
//       withCredentials: !!withAuth,
//     })
//     .then((response) => Promise.resolve(response.data))
//     .catch(handleError);
// };

// Generic UPDATE function
export const updateData = async <Request, Response>(
  endpoint: string,
  data: Request,
  customHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  },
  withAuth = true
): Promise<Response> => {
  return axiosInstance
    .put<Response>(endpoint, data, {
      headers: { ...customHeaders, ...(withAuth ? undefined : {}) },
    })
    .then((response) => Promise.resolve(response.data))
    .catch(handleError);
};

// Generic DELETE function
export const deleteData = async (
  endpoint: string,
  id: string,
  customHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  },
  withAuth = true
): Promise<void> => {
  const url = `${endpoint}/${id}`;

  return axiosInstance
    .delete(url, {
      headers: { ...customHeaders, ...(withAuth ? undefined : {}) },
    })
    .then(() => Promise.resolve())
    .catch(handleError);
};
