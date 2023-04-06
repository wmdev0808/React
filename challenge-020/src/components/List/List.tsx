import { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";

import "./List.css";

function List() {
  const [items, setItems] = useState([1, 2, 3]);

  function addItemHandler() {
    setItems((prevItems) => {
      return prevItems.concat(prevItems.length + 1);
    });
  }

  function removeItemHandler(selIndex: number) {
    setItems((prevItems) =>
      prevItems.filter((item, index) => index !== selIndex)
    );
  }

  const listItems = items.map((item, index) => (
    <CSSTransition key={index} classNames="fade" timeout={300}>
      <li className="ListItem" onClick={removeItemHandler.bind(null, index)}>
        {item}
      </li>
    </CSSTransition>
  ));

  return (
    <div>
      <button className="Button" onClick={addItemHandler}>
        Add Item
      </button>
      <p>Click Item to Remove.</p>
      <TransitionGroup component="ul" className="List">
        {listItems}
      </TransitionGroup>
    </div>
  );
}

export default List;
