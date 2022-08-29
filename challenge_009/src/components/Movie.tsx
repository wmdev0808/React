import classes from "./Movie.module.css";

interface MovieProps {
  title: string;
  releaseDate: string;
  openingText: string;
}

function Movie(props: MovieProps) {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
    </li>
  );
}

export default Movie;
