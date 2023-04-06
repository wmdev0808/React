import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import Posts from "../components/Posts";
import Post from "../types/Post";
import { getSlowPosts } from "../util/api";

function DeferredBlogPostsPage() {
  const loaderData = useLoaderData() as { posts: Post[] };

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={loaderData.posts}
          errorElement={<p>Error loading blog posts.</p>}
        >
          {(loadedPosts) => <Posts blogPosts={loadedPosts} />}
        </Await>
      </Suspense>
    </>
  );
}

export default DeferredBlogPostsPage;

export async function loader<Post>() {
  return defer({ posts: getSlowPosts<Post>() });
}
