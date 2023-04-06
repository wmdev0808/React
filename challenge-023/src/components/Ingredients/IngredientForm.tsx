import React, { ChangeEvent, FormEvent, useState } from "react";

import Card from "../UI/Card";
import LoadingIndicator from "../UI/LoadingIndicator";
import "./IngredientForm.css";

export interface IngredientInput {
  title: string;
  amount: number;
}

interface IngredientFormProps {
  loading: boolean;
  onAddIngredient: (ingredient: IngredientInput) => void;
}

const IngredientForm = React.memo((props: IngredientFormProps) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  console.log("RENDERING INGREDIENT FORM");

  function titleChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setEnteredTitle(event.target.value);
  }

  function amountChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setEnteredAmount(event.target.value);
  }

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.onAddIngredient({ title: enteredTitle, amount: +enteredAmount });
  }

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
