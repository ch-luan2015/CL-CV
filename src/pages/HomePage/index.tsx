import React from "react";
import SideBar from "../../components/SideBar";
import PostList from "../../components/Post/PostList";
import Layout from "../../layout/index";
interface Props {}
function HomePage(props: Props) {
  return <PostList />;
}

export default HomePage;
