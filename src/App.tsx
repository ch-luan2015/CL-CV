import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CreatePost from "./components/CreatePost";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import UploadImage from "./components/UploadImageTest/UploadImage";
import PostTable from "./components/Post/PostTable";
import PostUpdate from "./components/Post/PostUpdate";
import BlogLayout from "./layout/BlogLayout";
import HomeLayout from "./layout/HomeLayout";
import AdminLayout from "./layout/AdminLayout";
import {
  AuthenticationProvider,
  useReactOidc,
} from "@axa-fr/react-oidc-context";
import { UserManagerSettings } from "oidc-client";
import { PrivatePage } from "./pages/PrivatePage/PrivatePage";
import { useOidcSecure } from "@axa-fr/react-oidc-context/dist/reactServices/OidcSecure";
import { Button } from "@chakra-ui/core";

import { BLOG_LINK } from "../src/blog/Constants.utils";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import "./App.sass";
const configuration: UserManagerSettings = {
  client_id: "5f4f670c-0dfc-11eb-adc1-0242ac120002",
  redirect_uri: "https://localhost:3000/callback",
  response_type: "code",
  post_logout_redirect_uri: "https://localhost:3000/logout/callback",
  scope: "openid profile offline",
  authority: "https://auth.my-shell.com",
  silent_redirect_uri: "https://localhost:3000/authentication/silent_callback",
};

const NotAuthenticatedPage = () => {
  const { login } = useReactOidc();
  return (
    <div>
      You must login to access this page.
      <Button onClick={() => login()}>Login</Button>
    </div>
  );
};

function App() {
  return (
    <AuthenticationProvider
      configuration={configuration}
      notAuthenticated={NotAuthenticatedPage}
      notAuthorized={NotAuthenticatedPage}
    >
      <Router>
        <Switch>
          <Route exact path={BLOG_LINK} component={Blog} />
          <Route
            exact
            path={`${BLOG_LINK}:blogPostFileName`}
            component={BlogPost}
          />

          {/* <Route path="/private" component={PrivatePage} />
          <Route path={["/blog", "/blog/:id"]}>
            <BlogLayout>
              <Route path="/blog/:id" exact component={PostPage} />
            </BlogLayout>
          </Route> */}

          <Route exact path={["/"]}>
            <HomeLayout>
              <Route path="/" exact component={HomePage} />
            </HomeLayout>
          </Route>

          <Route path={["/admin"]}>
            <AdminLayout>
              <Switch>
                <Route path="/admin/post" exact component={CreatePost} />
                <Route path="/admin/image" exact component={UploadImage} />
                <Route path="/admin/table" exact component={PostTable} />
                {/* <Route path="/admin/markdown" exact component={MdEditor} /> */}
                <Route path="/admin/update/:id" component={PostUpdate} />
              </Switch>
            </AdminLayout>
          </Route>
        </Switch>
      </Router>
    </AuthenticationProvider>
  );
}

export default App;
// "start": "npm run watch:css && HTTPS=true react-scripts start",
