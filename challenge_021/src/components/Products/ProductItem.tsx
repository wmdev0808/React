// import { useDispatch } from "react-redux";

import { useContext } from "react";
import { ProductsContext } from "../../context/product-context";

import Card from "../UI/Card";
import "./ProductItem.css";
// import { toggleFav } from "../../store/actions/products";

interface ProductItemProps {
  id: string;
  title: string;
  description: string;
  isFav: boolean;
}

function ProductItem(props: ProductItemProps) {
  // const dispatch = useDispatch();
  const toggleFav = useContext(ProductsContext).toggleFav;

  function toggleFavHandler() {
    // dispatch(toggleFav(props.id));
    toggleFav(props.id);
  }

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className="product-item">
        <h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? "button-outline" : ""}
          onClick={toggleFavHandler}
        >
          {props.isFav ? "Un-Favorite" : "Favorite"}
        </button>
      </div>
    </Card>
  );
}

export default ProductItem;
