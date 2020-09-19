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
  var p = await post<UpdatePostRequest>(
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

//Dinh nghix props dau vao data
// const postImage = async (data) => {
//   // Dinh nghia props image
//   var file = await put<>(
//     `${process.env.REACT_APP_API_URL}/admin/image`,
//     file
//   );
//   if (file === undefined) return Promise.reject(exceptions.cantUpImage);

//   return file;
// };

export const postAPI = {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
};
