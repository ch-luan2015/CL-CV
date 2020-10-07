import { CreatePostRequest, UpdatePostRequest } from "../models/PostAPI";
import { put, get, post, _delete } from "./helper";
import { PostProps, PostMetric } from "../models/PostProps";
import { exceptions } from "./exceptions";

export interface User {
  id: number;
  name: string;
  token: string;
  email: string;
  phone: string;
}

export const loginUser = async (req: CreatePostRequest) => {
  const loginData = await post<User>(
    `${process.env.REACT_APP_API_ADMIN}/login`,
    JSON.stringify(req)
  );

  if (loginData === undefined) return Promise.reject(exceptions.invalidFormat);

  return loginData;
};
