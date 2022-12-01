import socialClient, { socialApiResponse } from './socialClient';

const baseURL = '/auth';

export const apiLogin = async (
  email: string,
  password: string
): Promise<socialApiResponse> => {
  const response = await socialClient.post<any>(`${baseURL}/login`, {
    email: email,
    password: password,
  });
  return { status: response.status, payload: response.data };
};

export const apiLogout = async (): Promise<socialApiResponse> => {
  const response = await socialClient.post<any>(`${baseURL}/logout`);
  sessionStorage.removeItem('userData');
  return { status: response.status, payload: response.data };
};

export const apiRegister = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<socialApiResponse> => {
  const response = await socialClient.post<any>(`${baseURL}/register`, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
  return { status: response.status, payload: response.data };
};

export const apiGetUser = async () => {
  const response = await socialClient.post<any>(`${baseURL}/user`);
  return { status: response.status, payload: response.data };
};
