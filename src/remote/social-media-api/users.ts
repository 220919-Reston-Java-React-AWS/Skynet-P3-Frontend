import socialClient from './socialClient';

const baseURL = '/users';

export const apiGetFollowing = async () => {
  try {
    const response = await socialClient.get<any>(`${baseURL}/following`);
    return { status: response.status, payload: response.data };
  } catch (error: any) {
    return { status: error.status, payload: [] };
  }
};

export const apiGetFollowers = async () => {
  try {
    const response = await socialClient.get<any>(`${baseURL}/followers`);
    return { status: response.status, payload: response.data };
  } catch (error: any) {
    console.log(error.response.data.error);
    return { status: error.status, payload: [] };
  }
};

export const apiNewFollow = async (i: number) => {
  const response = await socialClient.put<any>(`${baseURL}/follow`, {
    userId: i,
  });
  return { status: response.status, payload: response.data };
};
