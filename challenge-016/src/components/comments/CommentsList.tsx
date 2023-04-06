import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";

export interface Comment {
  id: string;
  text: string;
}

interface CommentsListProps {
  comments: Comment[];
}

function CommentsList(props: CommentsListProps) {
  return (
    <ul className={classes.comments}>
      {props.comments.map((comment) => (
        <CommentItem key={comment.id} text={comment.text} />
      ))}
    </ul>
  );
}

export default CommentsList;
