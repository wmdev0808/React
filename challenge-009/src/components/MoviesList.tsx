import { MovieItem } from "./AddMovie";
import Movie from "./Movie";
import classes from "./MoviesList.module.css";

interface MoviesListProps {
  movies: MovieItem[];
}

function MoviesList(props: MoviesListProps) {
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
}

export default MoviesList;
