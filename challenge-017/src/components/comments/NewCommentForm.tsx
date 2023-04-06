import { FormEvent, useEffect, useRef } from "react";

import useHttp from "../../hooks/use-http";
import { addComment, CommentRequestData } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";

interface NewCommentFormProps {
  quoteId: string;
  onAddedComment: () => void;
}

const NewCommentForm = (props: NewCommentFormProps) => {
  const commentTextRef = useRef<HTMLTextAreaElement>(null);

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (
    event: FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    const enteredText = commentTextRef.current!.value;

    // optional: Could validate here

    sendRequest({
      commentData: { text: enteredText },
      quoteId: props.quoteId,
    } as CommentRequestData);
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows={5} ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
