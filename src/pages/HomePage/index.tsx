import React from "react";
import PostList from "../../components/Post/PostList";
// eslint-disable-next-line import/no-unresolved, import/extensions

import { blogPosts1 } from "./blog/*.mdx";

function HomePage() {
  console.log("blogPosts", blogPosts1);

  return <PostList />;
}
export default HomePage;
