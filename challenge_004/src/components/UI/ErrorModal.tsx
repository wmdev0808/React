import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

interface BackdropProps {
  onConfirm: React.MouseEventHandler<HTMLDivElement>;
}

const Backdrop = (props: BackdropProps) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

interface ModalOverlayProps {
  title: string;
  message: string;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalOverlay = (props: ModalOverlayProps) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

interface ErrorModalProps {
  title: string;
  message: string;
  onConfirm: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

const ErrorModal = (props: ErrorModalProps) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
