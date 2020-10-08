import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* <Route path="/login" component={Login}/> */}

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

          <Route>
            <Layout>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={LoginModal} />
                <Route exact path="/:id" component={PostPage} />
              </Switch>
            </Layout>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
