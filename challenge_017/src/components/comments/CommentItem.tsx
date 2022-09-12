import classes from "./CommentItem.module.css";

interface CommentItemProp {
  text: string;
}

function CommentItem(props: CommentItemProp) {
  return (
    <li className={classes.item}>
      <p>{props.text}</p>
    </li>
  );
}

export default CommentItem;
