import { useLoaderData } from "react-router-dom";

import Posts from "../components/Posts";
import Post from "../types/Post";
import { getPosts } from "../util/api";

function BlogPostsPage() {
  const loaderData = useLoaderData();

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Posts blogPosts={loaderData as Post[]} />
    </>
  );
}

export default BlogPostsPage;

export function loader<Post>() {
  return getPosts<Post>();
}
