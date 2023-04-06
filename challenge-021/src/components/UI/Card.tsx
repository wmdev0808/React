import React, { CSSProperties, ReactNode } from "react";

import "./Card.css";

interface CardProps {
  children?: ReactNode;
  style?: CSSProperties;
}

function Card(props: CardProps) {
  return (
    <div className="card" style={props.style}>
      {props.children}
    </div>
  );
}

export default Card;
