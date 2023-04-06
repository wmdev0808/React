import "./Backdrop.css";

interface BackdropProps {
  show: boolean;
}

function Backdrop(props: BackdropProps) {
  const cssClasses = [
    "Backdrop",
    props.show ? "BackdropOpen" : "BackdropClosed",
  ];

  return <div className={cssClasses.join(" ")}></div>;
}

export default Backdrop;
