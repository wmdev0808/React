import { Fragment, memo, ReactNode } from "react";

import "./ErrorModal.css";

interface ErrorModalProps {
  children?: ReactNode;
  onClose: () => void;
}

const ErrorModal = memo((props: ErrorModalProps) => {
  return (
    <Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="error-modal">
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className="error-modal__actions">
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </Fragment>
  );
});

export default ErrorModal;
