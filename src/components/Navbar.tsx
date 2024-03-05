import { SetStateAction } from "react"
import { MovieType } from "../types"
import Searchbar from "./Searchbar"
import { Dispatch } from "react"

export default function Navbar({movies, setMovies}: {
    movies: MovieType[], setMovies: Dispatch<SetStateAction<MovieType[]>>
}) {
    return <nav className="nav">
        <a href="/" className="site-title">Main Page</a>
        <Searchbar movies={movies} setMovies={setMovies}/>
        <a href="/favorite">Favorite</a>
    </nav>
}