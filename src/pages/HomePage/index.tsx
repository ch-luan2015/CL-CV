import React from "react";
import SideBar from "../../components/SideBar";
import PostList from "../../components/Post/PostList";
import Layout from "../../layout/index";
import Container from "../../components/Container";
interface Props {}
// flex flex-row flex-wrap justify-start align-left
function HomePage(props: Props) {
  return (
    // <Layout>
    <Container>
      <div className="w-full ">
        <PostList />
      </div>
    </Container>
    // </Layout>
  );
}

export default HomePage;
