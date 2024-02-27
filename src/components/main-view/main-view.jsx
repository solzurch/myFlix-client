import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      Id: 1,
      Title: "The Dark Knight",
      Description:
        "A vigilante known as Batman sets out to dismantle the criminal organization led by the Joker.",
      Genre: ["Action"],
      Director: "Christopher Nolan",
      ImagePath: "darkknight.png",
      Featured: true,
    },
    {
      Id: 2,
      Title: "Fight Club",
      Description:
        "An insomniac office worker and a soap salesman form an underground fight club that evolves into something much, much more.",
      Genre: ["Drama"],
      Director: "David Fincher",
      ImagePath: "fightclub.png",
      Featured: false,
    },
    {
      Id: 3,
      Title: "Seven",
      Description:
        "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
      Genre: ["Thriller"],
      Director: "David Fincher",
      ImagePath: "seven.png",
      Featured: false,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
