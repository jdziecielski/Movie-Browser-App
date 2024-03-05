import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import "../types"
import { MovieType } from "../types";

export default function Searchbar({movies, setMovies}: {
    movies: MovieType[], setMovies: Dispatch<SetStateAction<MovieType[]>>
}) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchedMovies, setSearchedMovies] = useState<MovieType[]>([]);
    const [isSearchbarVisible, setIsSearchbarVisible] = useState<boolean>(false);
    const inputRef = useRef<HTMLUListElement>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>  {
        setSearchQuery(e.target.value)  
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
          setIsSearchbarVisible(false);
        }
    };

    function removeFromFavoriteMovies(movieToRemove: MovieType) {
        setMovies(movies.map((movie: MovieType) => {
            if (movie.imdbID === movieToRemove.imdbID) return {...movie, isFavorite: false}
            else return movie
        }))

        setIsSearchbarVisible(false)
    } 

    function addToFavoriteMovies(movieToAdd: MovieType) {
        const exists = movies.some((movie: MovieType) => movie.imdbID === movieToAdd.imdbID)

        if (exists) {
            const updatedMovies = movies.map((movie: MovieType) => {
                if (movie.imdbID === movieToAdd.imdbID) return {...movie, isFavorite: true}
                else return movie
            })
            setMovies(updatedMovies)
        } else {
            const newMovie: MovieType = {...movieToAdd, isFavorite: true};
            setMovies((prevMovies: MovieType[]) => { return [...prevMovies, newMovie] })
        }

        setIsSearchbarVisible(false)
    }

    useEffect(() => {
        fetch('http://www.omdbapi.com/?apikey=8d3674c3&s=' + `${searchQuery}`)
        .then((response: Response) => {
        if (!response.ok) throw new Error("API response not ok!")
        return response.json()
        })
        .then(data => {
            if (data.Search && Array.isArray(data.Search)) setSearchedMovies(data.Search)
        })
        .catch((error: Error) => console.log(error));

    }, [searchQuery])


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);


    return (
        <>
            <div className="searchedmovies">
                <input 
                    type="search"
                    placeholder="Search for Movies or Series..."
                    onChange={handleChange}
                    onFocus={() => setIsSearchbarVisible(true)}
                    // onBlur={() => setShowMovies(false)}
                    value={searchQuery}
                />
                {isSearchbarVisible && (
                    <ul ref={inputRef} className="dropdownmovies">
                        {searchedMovies.map(movie => (
                            <li key={movie.imdbID}>
                                {movie.Title}
                                {movie.isFavorite ? (
                                    <img src="../../dist/assets/dislike.png" className="heart" onClick={() => removeFromFavoriteMovies(movie)} alt="Dislike"/>
                                ) : (
                                    <img src="../../dist/assets/like.png" className="heart" onClick={() => addToFavoriteMovies(movie)} alt="Like"/>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}