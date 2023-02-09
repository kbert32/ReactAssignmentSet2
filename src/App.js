import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fectchMoviesHandler = useCallback(async () => {       //we need to use useCallback to avoid an infinite loop with our useEffect 
    setIsLoading(true);                                   //otherwise our handler function would be re-created with every re-render of the component
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films')
      
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
  
      const transformedMovies = data.results.map(movieData => {   //this map is done to convert the incoming data property names 
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false);  
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {                 //we can use useEffect to cause the app to fetch data from the API when the app first loads
    fectchMoviesHandler();
  }, [fectchMoviesHandler]);        //we should include the handler function as a dependency just in case the function contains some kind of external state

  let content = <p>Found no movies.</p>;
  
  if (movies.length === 0) {
    content = <p>Found no movies</p>;
  }
  
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fectchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
