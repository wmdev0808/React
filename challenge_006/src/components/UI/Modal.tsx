import React, { Fragment, ReactNode } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

interface BackdropProps {
  onClose: () => void;
}

function Backdrop(props: BackdropProps) {
  return <div className={classes.backdrop} onClick={props.onClose} />;
}

interface ModalOverlayProps {
  children?: ReactNode;
}

function ModalOverlay(props: ModalOverlayProps) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

const portalElement: HTMLDivElement = document.getElementById(
  "overlays"
)! as HTMLDivElement;

interface ModalProps {
  onClose: () => void;
  children?: ReactNode;
}

function Modal(props: ModalProps) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}

export default Modal;
