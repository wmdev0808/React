import { type Params, useLoaderData } from "react-router-dom";

import BlogPost from "../components/BlogPost";
import NewsletterSignup from "../components/NewsletterSignup";
import Post from "../types/Post";
import { getPost } from "../util/api";

function PostDetailPage() {
  const postData = useLoaderData() as Post;

  return (
    <>
      <BlogPost title={postData.title} text={postData.body} />
      <NewsletterSignup />
    </>
  );
}

export default PostDetailPage;

export function loader({ params }: { params: Params<"id"> }) {
  const postId = params.id;

  return getPost<Post>(postId);
}
