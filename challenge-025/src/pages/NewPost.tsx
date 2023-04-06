import {
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import NewPostForm from "../components/NewPostForm";
import ApiError from "../types/ApiError";
import { PostInput } from "../types/Post";
import { savePost } from "../util/api";

function NewPostPage() {
  const data = useActionData() as ApiError;
  const navigate = useNavigate();
  const navigation = useNavigation();

  function cancelHandler() {
    navigate("/blog");
  }

  return (
    <>
      {data && data.status && <p>{data.message}</p>}
      <NewPostForm
        onCancel={cancelHandler}
        submitting={navigation.state === "submitting"}
      />
    </>
  );
}

export default NewPostPage;

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const post = {
    title: formData.get("title"),
    body: formData.get("post-text"),
  };

  try {
    await savePost(post);
  } catch (err: any) {
    if (err.status === 422) {
      return err;
    }
    throw err;
  }

  return redirect("/blog");
}
