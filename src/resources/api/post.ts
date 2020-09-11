import { CreatePostRequest, UpdatePostRequest } from "../models/PostAPI";
import { put, get, post, _delete } from "./helper";
import { PostProps, PostMetric } from "../models/PostProps";
import { exceptions } from "./exceptions";

const queryString = require("query-string");

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

const updatePost = async (id: number, req: UpdatePostRequest) => {
  var p = await post<UpdatePostRequest>(
    `${process.env.REACT_APP_API_URL}/post/${id}`,
    JSON.stringify(req)
  );

  if (p === undefined) return Promise.reject(exceptions.invalidFormat);

  return p;
};

export const postAPI = {
  createPost,
};
