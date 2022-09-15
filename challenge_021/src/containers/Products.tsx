// import { useSelector } from "react-redux";
// import { RootState } from "..";

// import { useContext } from "react";

// import { ProductsContext } from "../context/product-context";
import { useStore } from "../hooks-store/store";

import ProductItem from "../components/Products/ProductItem";

import "./Products.css";

function Products() {
  // const productList = useSelector((state: RootState) => state.shop.products);
  // const productList = useContext(ProductsContext).products;
  const { products: productList } = useStore()[0];

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
