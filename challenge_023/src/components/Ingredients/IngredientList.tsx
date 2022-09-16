import "./IngredientList.css";

export interface Ingredient {
  id: string;
  title: string;
  amount: number;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  onRemoveItem: (id: string) => void;
}

function IngredientList(props: IngredientListProps) {
  console.log("RENDERING INGREDIENTLIST");
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map((ig) => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(null, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default IngredientList;
