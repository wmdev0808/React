import ExpenseItem, { ExpenseItemProps } from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";

interface ExpensesProps {
  items: ExpenseItemProps[];
}

const Expenses = ({ items }: ExpensesProps) => {
  return (
    <Card className="expenses">
      {items.map((item) => (
        <ExpenseItem key={item.id} {...item} />
      ))}
    </Card>
  );
};

export default Expenses;
