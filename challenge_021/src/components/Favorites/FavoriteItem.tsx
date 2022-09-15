import Card from "../UI/Card";
import "./FavoriteItem.css";

interface FavoriteItemProps {
  id: string;
  title: string;
  description: string;
}

function FavoriteItem(props: FavoriteItemProps) {
  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className="favorite-item">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </Card>
  );
}

export default FavoriteItem;
