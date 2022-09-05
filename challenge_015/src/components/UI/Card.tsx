import { ReactNode } from "react";

import classes from "./Card.module.css";

interface CardProps {
  children?: ReactNode;
  className?: string;
}

function Card(props: CardProps) {
  return (
    <section
      className={`${classes.card} ${props.className ? props.className : ""}`}
    >
      {props.children}
    </section>
  );
}

export default Card;
