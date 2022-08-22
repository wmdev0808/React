import React from "react";
import "./Card.css";

interface CardProps {
  className: string;
  children?: React.ReactNode;
}

function Card(props: CardProps) {
  const classes = "card " + props.className;

  return <div className={classes}>{props.children}</div>;
}

export default Card;
