interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}

const Button = ({ onClick, text }: ButtonProps) => (
  <button className={"some-className"} onClick={onClick}>
    {text}
  </button>
);

export default Button;
