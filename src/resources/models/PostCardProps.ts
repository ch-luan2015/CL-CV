import { PostRestriction } from "./PostAPI";

export interface PostCardProps {
  id?: number;
  subject?: string;
  content?: string;
  canComment?: boolean;
  lastModifiedAt?: string;
  createdBy?: string;
  createdAt?: string;
  viewCount?: number;
  commentCount?: number;
  postRestrictionType?: PostRestriction;
  postAccessUsers?: string[];
  tags?: string[];
}
