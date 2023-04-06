import { useEffect, useState } from "react";

import Posts from "../components/Posts";
import Post from "../types/Post";
import { getPosts } from "../util/api";

function BlogPostsPage() {
  const [error, setError] = useState<string>();
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      try {
        const posts = await getPosts<Post>();
        setPosts(posts);
      } catch (err: any) {
        setError(err.message);
      }
      setIsLoading(false);
    }

    loadPosts();
  }, []);

  return (
    <>
      <h1>Our Blog Posts</h1>
      {isLoading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      {!error && posts && <Posts blogPosts={posts} />}
    </>
  );
}

export default BlogPostsPage;
