import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = (props: WrapperProps) => {
  return props.children as JSX.Element;
};

export default Wrapper;
