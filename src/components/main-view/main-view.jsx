import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Dark Knight",
      description:
        "A vigilante known as Batman sets out to dismantle the criminal organization led by the Joker.",
      genre: ["Action"],
      director: "Christopher Nolan",
      // ImagePath: "darkknight.png",
      featured: true,
    },
    {
      id: 2,
      title: "Fight Club",
      description:
        "An insomniac office worker and a soap salesman form an underground fight club that evolves into something much, much more.",
      genre: ["Drama"],
      director: "David Fincher",
      // ImagePath: "fightclub.png",
      featured: false,
    },
    {
      id: 3,
      title: "Seven",
      description:
        "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
      genre: ["Thriller"],
      director: "David Fincher",
      // ImagePath: "seven.png",
      featured: false,
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
