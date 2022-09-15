import { useSelector } from "react-redux";
import { RootState } from "..";

import ProductItem from "../components/Products/ProductItem";
import "./Products.css";

function Products() {
  const productList = useSelector((state: RootState) => state.shop.products);
  return (
    <ul className="products-list">
      {productList.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
}

export default Products;
