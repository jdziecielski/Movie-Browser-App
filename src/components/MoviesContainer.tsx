import { MovieType } from "../types";
import { Dispatch, SetStateAction } from 'react';
import MovieComponent from "./MoviesComponent";

export default function MoviesContainer({movies, setMovies, isFavoritePage}: {
    movies: MovieType[];
    setMovies: Dispatch<SetStateAction<MovieType[]>>;
    isFavoritePage: boolean;
}){
    return (
        <>
            <div className="moviescontainer">
                {isFavoritePage ? (
                    <ul className="movieslist">
                        {movies.map((movie: MovieType) => (
                            movie.isFavorite && (
                                <li key={movie.imdbID} className="movieelement">
                                    <MovieComponent movie={movie} movies={movies} setMovies={setMovies}/>
                                </li>
                            )
                        ))}
                    </ul>
                ) : (
                    <ul className="movieslist">
                        {movies.map((movie: MovieType) => (
                            <li key={movie.imdbID} className="movieelement">
                                <MovieComponent movie={movie} movies={movies} setMovies={setMovies}/>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )    
}