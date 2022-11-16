import Post from '../../models/Post';

//Josiah
import Comment from '../../models/Comment';
import socialClient, { socialApiResponse } from './socialClient';

const baseURL = '/post';

//Josiah
const baseurl = '/comment';

export const apiGetPosts = async (): Promise<socialApiResponse> => {
  const response = await socialClient.get<any>(baseURL);
  return { status: response.status, payload: response.data };
};

export const apiUpsertPost = async (post: any): Promise<socialApiResponse> => {
  const response = await socialClient.put<any>(baseURL, post, {
    withCredentials: true,
  });
  return { status: response.status, payload: response.data };
};

export const apiAddorRemoveLike = async (
  post: Post
): Promise<socialApiResponse> => {
  const response = await socialClient.put<any>(`${baseURL}/like`, post, {
    withCredentials: true,
  });
  return { status: response.status, payload: response.data };
};

export const apiDeletePost = async (
  post: Post
): Promise<socialApiResponse> => {
  const response = await socialClient.delete<any>(`${baseURL}/delete-post`, {
    withCredentials: true, data: post
  });
  return { status: response.status, payload: response.data };
};


// Josiah
export const apiDeleteComment = async (
  comment: Comment
): Promise<socialApiResponse> => {
  const response = await socialClient.delete<any>(`${baseurl}/delete-comment`, {
    withCredentials: true, data: comment
  });
  return { status: response.status, payload: response.data };
};
