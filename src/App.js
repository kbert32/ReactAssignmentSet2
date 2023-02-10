import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);    //used for 'Loading...' mesage
  const [error, setError] = useState(null);   //used to store an error message

  const fectchMoviesHandler = useCallback(async () => {       //we need to use useCallback to avoid an infinite loop with our useEffect 
    setIsLoading(true);                                   //otherwise our handler function would be re-created with every re-render of the component
    setError(null);
    try {
      const response = await fetch('https://react-http-c59e3-default-rtdb.firebaseio.com/movies.json')
      
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      
      const loadedMovies = [];

      for (const key in data) {   //firebase sends back an object so we need to convert it to an array for our app
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      // const transformedMovies = data.results.map(movieData => {   //this map is done to convert the incoming data property names 
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,                  //no longer usable since firebase sends back an object 
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date
      //   };
      // });
      
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {                 //we can use useEffect to cause the app to fetch data from the API when the app first loads
    fectchMoviesHandler();
  }, [fectchMoviesHandler]);        //we should include the handler function as a dependency just in case the handler function contains some kind of external state

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-c59e3-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),    //error handling could also be added to the POST operation similar to the GET
      header: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies.</p>;
    
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fectchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;


//React can talk to a backend but not to a database directly
//it can do this using the 'fetch' API, or a third party library like 'Axios'
