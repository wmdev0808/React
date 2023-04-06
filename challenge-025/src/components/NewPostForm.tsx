import { Form } from "react-router-dom";

import classes from "./NewPostForm.module.css";

interface NewPostFormProps {
  onCancel: () => void;
  // onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  submitting: boolean;
}

function NewPostForm({ onCancel, submitting }: NewPostFormProps) {
  return (
    <Form className={classes.form} method="post" action="/blog/new">
      <fieldset>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required minLength={5} />
      </fieldset>
      <fieldset>
        <label htmlFor="text">Post Text</label>
        <textarea
          id="text"
          name="post-text"
          required
          minLength={10}
          rows={5}
        ></textarea>
      </fieldset>
      <button type="button" onClick={onCancel} disabled={submitting}>
        Cancel
      </button>
      <button disabled={submitting}>
        {submitting ? "Submitting..." : "Create Post"}
      </button>
    </Form>
  );
}

export default NewPostForm;
