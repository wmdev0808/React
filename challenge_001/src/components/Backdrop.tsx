interface BackdropProps {
  onClick: () => void;
}

function Backdrop(props: BackdropProps) {
  return <div className="backdrop" onClick={props.onClick} />;
}

export default Backdrop;
