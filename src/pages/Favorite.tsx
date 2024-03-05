import MoviesContainer from "../components/MoviesContainer"
import { MovieType } from "../types"
import { Dispatch, SetStateAction } from 'react';

export default function Favorite({movies, setMovies}: {
    movies: MovieType[];
    setMovies: Dispatch<SetStateAction<MovieType[]>>;
}) {
    return <MoviesContainer movies={movies} setMovies={setMovies} isFavoritePage={true}/>
}