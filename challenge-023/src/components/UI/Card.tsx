import { ReactNode } from "react";

import "./Card.css";

interface CardProps {
  children?: ReactNode;
}

function Card(props: CardProps) {
  return <div className="card">{props.children}</div>;
}

export default Card;
