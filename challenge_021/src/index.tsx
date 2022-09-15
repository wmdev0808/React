import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { combineReducers, createStore } from "redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import productReducer from "./store/reducers/products";
// import ProductsProvider from "./context/product-context";

import configureProductsStore from "./hooks-store/products-store";
import configureCounterStore from "./hooks-store/couter-store";

// const rootReducer = combineReducers({
//   shop: productReducer,
// });

// const store = createStore(rootReducer);

// export type RootState = ReturnType<typeof store.getState>;

configureProductsStore();
configureCounterStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider> */}

    {/* <ProductsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductsProvider> */}

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
