import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CSSReset, ThemeProvider, ColorModeProvider } from "@chakra-ui/core";

import CreatePost from "./components/CreatePost";
import PostPage from "./pages/PostPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import UploadImage from "./components/UploadImageTest/UploadImage";
import PostTable from "./components/Post/PostTable";
import MdEditor from "./components/Editors/MdEditor";
import PostUpdate from "./components/Post/PostUpdate";
import LoginModal from "./components/User/Login/LoginModal";
import BlogLayout from "layout/BlogLayout";
import HomeLayout from "layout/HomeLayout";
import Container from "components/Container";
import AdminLayout from "layout/AdminLayout";
function App() {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <Router>
          <Switch>
            <Route path={["/blog", "/blog/:id"]}>
              <BlogLayout>
                <Route path="/blog/:id" exact component={PostPage} />
              </BlogLayout>
            </Route>

            <Route exact path={["/", "/blogs"]}>
              <HomeLayout>
                <Route path="/" exact component={HomePage} />
              </HomeLayout>
            </Route>

            <Route path={["/admin"]}>
              <AdminPage>
                <Switch>
                  <Route path="/admin/post" exact component={CreatePost} />
                  <Route path="/admin/image" exact component={UploadImage} />
                  <Route path="/admin/table" exact component={PostTable} />
                  <Route path="/admin/markdown" exact component={MdEditor} />
                  <Route path="/admin/update/:id?" component={PostUpdate} />
                </Switch>
              </AdminPage>
            </Route>

            <Route>
              <AdminLayout>
                <Route path="/adminlayout" exact component={CreatePost} />
              </AdminLayout>
            </Route>
          </Switch>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
