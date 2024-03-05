import Navbar from "./components/Navbar"
import "./css/styles.css"
import Mainpage from "./pages/Mainpage"
import Favorite from "./pages/Favorite"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useState } from "react"
import { MovieType } from "./types"
import { useEffect } from "react"


function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const prevMovies: (string|null) = localStorage.getItem('movies')
    
    if (prevMovies && prevMovies.length > 2) {
      setMovies(JSON.parse(prevMovies))
    } else {
      getMoviesFromApi();
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies))
  }, [movies])

  function getMoviesFromApi() {
    let titles: string[] = ["Star Wars", "Iron Man"]
    titles.map((title: string) => {
      fetch('http://www.omdbapi.com/?apikey=8d3674c3&s=' + title)
      .then((Response: Response) => Response.json())
      .then((data) => setMovies((prevMovies: MovieType[]) => {
        const newMovies = data.Search.filter((newMovie: MovieType) => 
        !prevMovies.some((prevMovie: MovieType) => prevMovie.imdbID === newMovie.imdbID))
        return [...prevMovies, ...newMovies]
      }))
      .catch((error: Error) => console.error('API Error:' + error))
    })
  }


  return (
    <>
    <Navbar movies={movies} setMovies={setMovies}/>
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage movies={movies} setMovies={setMovies}/>} />
          <Route path="/favorite" element={<Favorite movies={movies} setMovies={setMovies}/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
