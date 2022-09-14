import { useState } from "react";
import { Transition } from "react-transition-group";

import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";
import "./App.css";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

  function showModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function toggleShowBlock() {
    setShowBlock((prev) => !prev);
  }

  const defaultStyle = {
    backgroundColor: "red",
    width: 100,
    height: 100,
    margin: "auto",
    transition: "opacity 1s ease-out",
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
    unmounted: { opacity: 0 },
  };

  return (
    <div className="App">
      <h1>React Animations</h1>
      <section>
        <button className="Button" onClick={toggleShowBlock}>
          Toggle
        </button>
        <br />
        <Transition
          in={showBlock}
          timeout={1000}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log("onEnter")}
          onEntering={() => console.log("onEntering")}
          onEntered={() => console.log("onEntered")}
          onExit={() => console.log("onExit")}
          onExiting={() => console.log("onExiting")}
          onExited={() => console.log("onExited")}
        >
          {(state) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            />
          )}
        </Transition>
      </section>
      <section></section>

      <Modal show={modalIsOpen} onClose={closeModal} />
      {modalIsOpen ? <Backdrop show /> : null}
      <button className="Button" onClick={showModal}>
        Open Modal
      </button>
      <h3>Animating Lists</h3>
      <List />
    </div>
  );
}

export default App;
