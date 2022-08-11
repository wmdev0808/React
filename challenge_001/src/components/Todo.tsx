import { useState } from "react";

import Backdrop from "./Backdrop";
import Modal from "./Modal";

interface TodoProps {
  text: string;
}

function Todo(props: TodoProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  function showModalHandler() {
    setShowModal(true);
  }

  function closeModalHandler() {
    setShowModal(false);
  }

  return (
    <div className="card">
      <h2>{props.text}</h2>
      <div className="actions">
        <button className="btn" onClick={showModalHandler}>
          Delete
        </button>
      </div>
      {showModal && <Backdrop onClick={closeModalHandler} />}
      {showModal && <Modal text="Are you sure?" onClose={closeModalHandler} />}
    </div>
  );
}

export default Todo;
