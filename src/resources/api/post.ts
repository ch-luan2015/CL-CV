import { CreatePostRequest, UpdatePostRequest } from "../models/PostAPI";
import { put, get, post, _delete } from "./helper";
import { PostProps, PostMetric } from "../models/PostProps";
import { exceptions } from "./exceptions";

const queryString = require("query-string");

//POST
export const createPost = async (req: CreatePostRequest) => {
  const postData = await post<PostProps>(
    `${process.env.REACT_APP_API_URL}/post`,
    JSON.stringify(req)
  );

  if (postData === undefined) return Promise.reject(exceptions.invalidFormat);

  return postData;
};

export const getPost = async (id: number) => {
  const post = await get<PostProps>(
    `${process.env.REACT_APP_API_URL}/post/${id}`
  );
  if (post === undefined) return Promise.reject(exceptions.invalidFormat);
  return post;
};

export const getPosts = async (
  pageIndex: number,
  pageRows: number,
  tags: string[]
) => {
  //Create query take paginate
  var query: any = { pageIndex, pageRows, tags };

  const url = queryString.stringifyUrl({
    url: `${process.env.REACT_APP_API_URL}/post`,
    query,
  });

  const posts = await get<PostProps[]>(url);

  if (posts === undefined) return Promise.reject(exceptions.invalidFormat);
  return posts;
};

const updatePost = async (id: number, req: UpdatePostRequest) => {
  var p = await put<UpdatePostRequest>(
    `${process.env.REACT_APP_API_URL}/post/${id}`,
    JSON.stringify(req)
  );

  if (p === undefined) return Promise.reject(exceptions.invalidFormat);
  return p;
};

const deletePost = async (id: number) => {
  var post = await _delete<any>(`${process.env.REACT_APP_API_URL}/post/${id}`);
  if (post === undefined) return Promise.reject(exceptions.postNotFound);
  return post;
};

const searchPosts = async (
  pageIndex: number,
  pageRows: number,
  tags?: string[],
  keywords?: string[]
) => {
  const query = { pageIndex, pageRows, tags };
  const url = queryString.stringifyUrl({
    url: `${process.env.REACT_APP_API_URL}/post/search`,
    query,
  });
  return await get<PostProps[]>(queryString.stringifyUrl({ query, url }));
};

//TAGS

const attachTag = async (postId: number, tag: string) => {
  return await put<void>(
    `${process.env.REACT_APP_API_URL}/post/${postId}/tag?tag=${tag}`
  );
};

const detachTag = async (postId: number, tag: string) => {
  return await _delete<void>(
    `${process.env.REACT_APP_API_URL}/post/${postId}/tag?tag=${tag}`
  );
};

export const postAPI = {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  searchPosts,
  attachTag,
  detachTag,
};
