import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CSSReset, ThemeProvider, ColorModeProvider } from "@chakra-ui/core";

import Layout from "./layout";
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

function App() {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <Router>
          <Switch>
            <Route>
              <HomeLayout>
                <Switch>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/blogs" exact component={HomePage} />
                  <Route path="/blogs/:id" exact component={PostPage} />
                </Switch>
              </HomeLayout>
            </Route>

            <Route path="/admin">
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
          </Switch>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
