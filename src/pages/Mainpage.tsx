import { MovieType } from "../types";
import MoviesContainer from "../components/MoviesContainer";
import { Dispatch, SetStateAction } from 'react';

export default function Mainpage({movies, setMovies}: {
    movies: MovieType[];
    setMovies: Dispatch<SetStateAction<MovieType[]>>;

}){
    return <MoviesContainer movies={movies} setMovies={setMovies} isFavoritePage={false}/>
}