import { ReactNode } from "react";

interface OutputProps {
  children?: ReactNode;
}

const Output = (props: OutputProps) => {
  return <p>{props.children}</p>;
};

export default Output;
