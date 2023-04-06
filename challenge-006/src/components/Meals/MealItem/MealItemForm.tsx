import { FormEvent, useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

interface MealItemFormProps {
  id: string;
  onAddToCart: (amount: number) => void;
}

function MealItemForm(props: MealItemFormProps) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const amount = amountInputRef.current!.value;
    const amountNumber = +amount;

    if (amount.trim().length === 0 || amountNumber < 1 || amountNumber > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(amountNumber);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
}

export default MealItemForm;
