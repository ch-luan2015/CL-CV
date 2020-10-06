import React from "react";
import SideBar from "../../components/SideBar";
import PostList from "../../components/Post/PostList";
import Layout from "../../layout/index";
import Container from "../../components/Container";
interface Props {}
// flex flex-row flex-wrap justify-start align-left
function HomePage(props: Props) {
  return (
    <>
      <div className="h-screen flex">
        <div className="w-4/5 flex-1 flex overflow-hidden">
          <PostList />
        </div>

        <div className="bg-gray-100 w-1/5">
          <SideBar />
        </div>
      </div>
    </>
    // <Layout>
    //   <Container>

    //   </Container>
    // </Layout>
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
