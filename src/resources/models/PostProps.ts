import { UserProps } from './UserProps'

export interface PostProps {
  type_of?: string,
  id?: number,
  title?: string,
  description?: string,
  cover_image?: string,
  readable_publish_date?: string,
  social_image?: string,
  tag_list?: string,
  tags?: string[],
  slug?: string,
  path?: string,
  url?: string,
  canonical_url?: string,
  comments_count?: number,
  positive_reactions_count?: number,
  collection_id?: number,

  created_at?: number,
  edited_at?: number,
  published_at?: number,
  last_comment_at?: number,
  published_timestamp?: number,

  user?:  UserProps;
}
