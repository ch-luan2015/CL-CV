import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./layout";
import CreatePost from "./components/CreatePost";
import PostPage from "./pages/PostPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import UploadImage from "./components/UploadImageTest/UploadImage";
import QuillEditor from "./components/Editors/QuillEditor";
import PostTable from "./components/Post/PostTable";
function App() {
  return (
    <>
      {/* <PostTable /> */}

      <Router>
        <Switch>
          {/* <Route path="/login" component={Login}/> */}

          <Route path="/admin/:path?" exact>
            <AdminPage>
              <Switch>
                {/* <Route path="/admin/post" exact component={CreatePost} /> */}
                <Route path="/admin/image" exact component={UploadImage} />
                <Route path="/admin/post" exact component={QuillEditor} />
                <Route path="/admin/table" exact component={PostTable} />
              </Switch>
            </AdminPage>
          </Route>

          <Route>
            <Layout>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/:id" component={PostTable} />
              </Switch>
            </Layout>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
