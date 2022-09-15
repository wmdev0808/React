// import { useSelector } from "react-redux";
// import { RootState } from "..";

import { useContext } from "react";

import ProductItem from "../components/Products/ProductItem";
import { ProductsContext } from "../context/product-context";
import "./Products.css";

function Products() {
  // const productList = useSelector((state: RootState) => state.shop.products);
  const productList = useContext(ProductsContext).products;

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
