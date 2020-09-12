import { UserProps } from "./UserProps";
import { PostRestriction } from "./PostAPI";
import { TagProps } from "./TagProps";

export interface PostTagProps {
  tag: TagProps;
}

export interface PostMetric {
  commentCount: number;
  viewCount: number;
}

export interface PostProps {
  subject: string;
  content: string;
  canComment: boolean;
  postRestrictionType: PostRestriction;
  postAccessUsers: string[];
  user?: UserProps;
}

export interface PostOverviewProps extends PostMetric {
  id: number;
  subject: string;
  overview: string;
  createdAt: string;
  createdBy: string;
  modifiedAt?: string;
  imageURL?: string;
  tags?: string[];
  commentCount: number;
  viewCount: number;
}

export interface PostListProps {
  posts: PostProps[];
  showImage?: boolean;
  showTag?: boolean;
}
