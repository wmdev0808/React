import { ReactNode } from "react";
import classes from "./Card.module.css";

interface CardProps {
  className?: string;
  children?: ReactNode;
}

const Card = ({ children, className }: CardProps) => {
  return <div className={`${classes.card} ${className}`}>{children}</div>;
};

export default Card;
