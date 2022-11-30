import socialClient from './socialClient';

const baseURL = '/users';

export const apiGetFollowing = async () => {
  const response = await socialClient.get<any>(`${baseURL}/following`);
  return { status: response.status, payload: response.data };
};

export const apiGetFollowers = async () => {
  const response = await socialClient.get<any>(`${baseURL}/followers`);
  return { status: response.status, payload: response.data };
};
