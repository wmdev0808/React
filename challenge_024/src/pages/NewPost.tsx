import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import NewPostForm from "../components/NewPostForm";
import { PostInput } from "../types/Post";
import { savePost } from "../util/api";

function NewPostPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error>();
  const navigate = useNavigate();

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const post = {
        title: formData.get("title"),
        body: formData.get("post-text"),
      } as PostInput;
      await savePost(post);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
    setIsSubmitting(false);
  }

  function cancelHandler() {
    navigate("/blog");
  }

  return (
    <>
      {error && <p>{error.message}</p>}
      <NewPostForm
        onCancel={cancelHandler}
        onSubmit={submitHandler}
        submitting={isSubmitting}
      />
    </>
  );
}

export default NewPostPage;
