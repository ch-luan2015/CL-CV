import React from "react";
import SideBar from "../../components/SideBar";
import PostList from "../../components/Post/PostList";
import Layout from "../../layout/index";
import Container from "../../components/Container";
interface Props {}

function HomePage(props: Props) {
  return (
    <Layout>
      <Container>
        <div className="flex flex-row flex-wrap justify-start align-left">
          <div className="w-4/5">
            <PostList />
          </div>

          <div className="w-1/5 ">
            <SideBar />
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default HomePage;

// <div className="max-w-screen-xl flex flex-row flex-wrap justify-center align-center">
// <div className="w-3/4 ">
//  <PostList/>
// </div>

// <div className="w-1/4 ">
//    <SideBar/>
// </div>
// </div>
