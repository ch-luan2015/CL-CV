import React, { useEffect, useState } from "react";
import NoSSR from "react-no-ssr";
import { Redirect, useParams } from "react-router-dom";
import {
  blogContainer,
  blogPostBackground,
  blogPostDark,
  blogPostMargins,
  blogPostNavbarMargin,
  footerStyle,
  width,
} from "../stylesheets/components/Blog/BlogItem.module.sass";
import { folders, getInitialTheme, mapFileNameToId } from "../utils/FileManager.utils";
// import BlogFooter from "../components/Footer/BlogFooter";
import HorizontalRuler from "../components/Util/HorizontalRuler";
import LoadingIndicator from "../components/Util/LoadingIndicator";
// import BlogNavbar from "../components/Navbar/BlogNavbar";
// import { firebaseAnalytics } from "../firebaseConfig";
import BlogPostMarkdown from "../components/Blog/BlogPostMarkdown";
import BlogLayout from "../layout/BlogLayout";

// const blogNavbar = require("../data/blogNavbar");
// const footer = require("../data/footer");

const BlogPost = () => {
  const [post, setPost] = useState("");
  const [isDark, setIsDark] = useState("");

  const { blogPostFileName } = useParams();

  let redirect = false;

  let hashedBlogFileLink;
  try {
    hashedBlogFileLink = mapFileNameToId(blogPostFileName, folders.blogFiles);
  } catch {
    redirect = true;
  }

  useEffect(() => {
    if (!redirect) {
      // firebaseAnalytics.logEvent(`${blogPostFileName}_visited`);
      window.scrollTo(0, 0);

      fetch(`/static/media/${hashedBlogFileLink}`)
        .then((res) => res.text())
        .then((response) => setPost(response))
        .catch((err) => setPost(err));
    }
  }, [hashedBlogFileLink, redirect, blogPostFileName]);

  const noSSRContent = <BlogPostMarkdown content={post} isDark={isDark} />;

  const content = (
    <BlogLayout>
    <div className={`${isDark ? blogPostDark : null} ${blogPostMargins} ${blogPostBackground}`}>
      <div className={width}>
        <div className={`${blogContainer}`}>
          {/* <BlogNavbar
            headerText={blogNavbar.blogBranding}
            headerLink={blogNavbar.blogLink}
            brandingLink={blogNavbar.homeLink}
            className={blogPostNavbarMargin}
            isDark={isDark}
            setIsDark={setIsDark}
          /> */}

          {post === "" ? (
            <LoadingIndicator isDark={isDark} />
          ) : (
            <BlogPostMarkdown content={post} isDark={isDark} />
          )}

          <HorizontalRuler isDark={isDark} />
        </div>
        {/* <div className={footerStyle}>
          <BlogFooter content={footer} isDark={isDark} />
        </div> */}
      </div>
    </div>
    </BlogLayout>
  );

  return redirect ? <Redirect to="/404" /> : <NoSSR onSSR={noSSRContent}>{content}</NoSSR>;
};

export default BlogPost;
