import React, { useMemo, useState, useEffect } from "react";
const queryString = require("query-string");
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";
import { Spinner } from "@blueprintjs/core";

import PostList from "./PostList";
interface SearchQuery {
  tags?: string[];
  keywords?: string[];
}
export default function SearchResultView(props) {
  const [posts, setPosts] = useState<PostProps[]>();

  const query = useMemo(() => {
    const query: SearchQuery = queryString.parse(props.location.search);
    return query;
  }, [props.location]);

  useEffect(() => {
    postAPI.searchPosts(0, 10, query.tags, query.keywords).then(setPosts);
  }, [query]);
  if (posts == null) return <Spinner />;

  return (
    <div>
      <h2>KẾT QUẢ TÌM KIẾM</h2>
      <PostList posts={posts} />;
    </div>
  );
}
