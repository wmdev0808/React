import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

interface ErrorModalProps {
  title: string;
  message: string;
  onConfirm: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

const ErrorModal = ({ message, onConfirm, title }: ErrorModalProps) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{title}</h2>
        </header>
        <div className={classes.content}>
          <p>{message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={onConfirm}>Okay</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
