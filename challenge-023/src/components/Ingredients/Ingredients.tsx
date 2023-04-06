import { useReducer, useEffect, useCallback, useMemo } from "react";

import IngredientForm, { IngredientInput } from "./IngredientForm";
import IngredientList, { Ingredient } from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../../hooks/http";

type IngredientsAction =
  | {
      type: "SET";
      ingredients: Ingredient[];
    }
  | { type: "ADD"; ingredient: Ingredient }
  | { type: "DELETE"; id: string };

const ingredientReducer = (
  currentIngredients: Ingredient[],
  action: IngredientsAction
) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifer, clear } =
    useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifer === "REMOVE_INGREDIENT") {
      dispatch({ type: "DELETE", id: reqExtra as string });
    } else if (!isLoading && !error && reqIdentifer === "ADD_INGREDIENT") {
      dispatch({
        type: "ADD",
        ingredient: {
          id: (data as { name: string }).name,
          ...(reqExtra as IngredientInput),
        },
      });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);

  const filteredIngredientsHandler = useCallback(
    (filteredIngredients: Ingredient[]) => {
      dispatch({ type: "SET", ingredients: filteredIngredients });
    },
    []
  );

  const addIngredientHandler = useCallback(
    (ingredient: IngredientInput) => {
      sendRequest(
        `${process.env.REACT_APP_API_URL}/ingredients.json`,
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (ingredientId: string) => {
      sendRequest(
        `${process.env.REACT_APP_API_URL}/ingredients/${ingredientId}.json`,
        "DELETE",
        null,
        ingredientId,
        "REMOVE_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
