import React, { useState, useEffect, useRef, ChangeEvent } from "react";

import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";
import "./Search.css";
import { Ingredient } from "./IngredientList";
import { IngredientInput } from "./IngredientForm";

export interface Response<T> {
  [key: string]: T;
}

interface SearchProps {
  onLoadIngredients: (ingredients: Ingredient[]) => void;
}

const Search = React.memo((props: SearchProps) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  function filterChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setEnteredFilter(event.target.value);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current?.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest(
          `${process.env.REACT_APP_API_URL}/ingredients.json${query}`,
          "GET"
        );
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const ingredientsData = data as Response<IngredientInput>;
      const loadedIngredients: Ingredient[] = [];
      for (const key in ingredientsData) {
        loadedIngredients.push({
          id: key,
          title: ingredientsData[key].title,
          amount: ingredientsData[key].amount,
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={filterChangeHandler}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
