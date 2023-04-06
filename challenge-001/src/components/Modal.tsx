interface ModalProps {
  onClose: () => void;
  text: string;
}

function Modal(props: ModalProps) {
  return (
    <div className="modal">
      <p>{props.text}</p>
      <button className="btn btn--alt" onClick={props.onClose}>
        Cancel
      </button>
      <button className="btn" onClick={props.onClose}>
        Confirm
      </button>
    </div>
  );
}

export default Modal;
