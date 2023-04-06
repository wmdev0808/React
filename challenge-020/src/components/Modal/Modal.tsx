import { CSSTransition } from "react-transition-group";

import "./Modal.css";

const animationTiming = {
  enter: 400,
  exit: 1000,
};

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal = (props: ModalProps) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      classNames={{
        enter: "",
        enterActive: "ModalOpen",
        exit: "",
        exitActive: "ModalClosed",
      }}
    >
      <div className="Modal">
        <h1>A Modal</h1>
        <button className="Button" onClick={props.onClose}>
          Dismiss
        </button>
      </div>
    </CSSTransition>
  );
};

export default Modal;
