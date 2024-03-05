import { Dispatch, SetStateAction } from "react";
import { MovieType } from "../types";


export default function MovieComponent({movie, movies, setMovies}: 
    {movie: MovieType, movies: MovieType[], setMovies: Dispatch<SetStateAction<MovieType[]>>})  
{
    function removeFromFavoriteMovies(movieToRemove: MovieType) {
        setMovies(movies.map((movie: MovieType) => {
            if (movie.imdbID === movieToRemove.imdbID) return {...movie, isFavorite: false}
            else return movie
        }))
    } 

    function addToFavoriteMovies(movieToAdd: MovieType) {
        setMovies(movies.map((movie: MovieType) => {
            if (movie.imdbID === movieToAdd.imdbID) return {...movie, isFavorite: true}
            else return movie
        }))
    }

    function removeMovieFromDisplayed(movieToRemove: MovieType) {
        setMovies(movies.filter((movie: MovieType) => movie.imdbID !== movieToRemove.imdbID))
    }

    return (
        <>
            <img src={movie.Poster} alt={`${movie.Title} Poster`}></img>
            {movie.Title}
            <div className="movieicons">
                
                {movie.isFavorite ? (
                    <img src="../../dist/assets/dislike.png" className="heart" onClick={() => removeFromFavoriteMovies(movie)} alt="Dislike"/>
                ) : (
                    <img src="../../dist/assets/like.png" className="heart" onClick={() => addToFavoriteMovies(movie)} alt="Like"/>
                    )}
                <img src="../../dist/assets/close_icon.png" className="closebutton" onClick={() => removeMovieFromDisplayed(movie)}/>
            </div>
        </>
    )
}