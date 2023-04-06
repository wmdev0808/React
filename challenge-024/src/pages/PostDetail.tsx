import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BlogPost from "../components/BlogPost";
import Post from "../types/Post";
import { getPost } from "../util/api";

function PostDetailPage() {
  const [error, setError] = useState<Error>();
  const [post, setPost] = useState<Post>();
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function loadPost() {
      setIsLoading(true);
      try {
        const post = await getPost<Post>(id);
        setPost(post);
      } catch (err: any) {
        setError(err.message);
      }
      setIsLoading(false);
    }

    loadPost();
  }, [id]);

  return (
    <>
      {isLoading && <p>Loading post...</p>}
      {error && <p>{error.message}</p>}
      {!error && post && <BlogPost title={post.title} text={post.body} />}
    </>
  );
}

export default PostDetailPage;
