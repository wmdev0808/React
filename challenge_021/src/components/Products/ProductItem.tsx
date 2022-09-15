// import { useDispatch } from "react-redux";

// import { useContext } from "react";
// import { ProductsContext } from "../../context/product-context";
import { memo } from "react";

import Card from "../UI/Card";
import "./ProductItem.css";
// import { toggleFav } from "../../store/actions/products";
import { useStore } from "../../hooks-store/store";

interface ProductItemProps {
  id: string;
  title: string;
  description: string;
  isFav: boolean;
}

const ProductItem = memo((props: ProductItemProps) => {
  // const dispatch = useDispatch();
  // const toggleFav = useContext(ProductsContext).toggleFav;
  console.log("RENDERING");
  const dispatch = useStore(false)[1];

  function toggleFavHandler() {
    // dispatch(toggleFav(props.id));
    // toggleFav(props.id);
    dispatch("TOGGLE_FAV", props.id);
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
});

export default ProductItem;
