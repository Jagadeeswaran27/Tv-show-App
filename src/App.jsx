import { useEffect, useState } from "react";
import { AppContext } from "./context-file/App-Context";
import MovieItems from "./components/MovieItems";
import MovieSummary from "./components/MovieSummary";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./components/Form";
export default function App() {
  const [movieState, setMovieState] = useState({
    movieData: [],
    isFormOpen: false,
    isSpinnerOpen: false,
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <MovieItems /> },
        {
          path: `/movies/:id`,
          element: <MovieSummary />,
        },
        { path: "/movies/:id/form", element: <Form /> },
      ],
    },
  ]);
  useEffect(() => {
    //this is for initially fetching all data from the api
    async function getData() {
      setMovieState((prev) => {
        return {
          ...prev,
          isFormOpen: true,
        };
      });
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        const data = await response.json();
        setMovieState((prev) => {
          return {
            ...prev,
            movieData: data,
          };
        });
      } catch (e) {
        console.error("failed to fetch data");
      } finally {
        setMovieState((prev) => {
          return {
            ...prev,
            isFormOpen: false,
          };
        });
      }
    }
    getData();
  }, []);
  function handleSelectedMovie(id) {
    const storeIds = JSON.parse(localStorage.getItem("selectedMovie")) || [];
    if (storeIds.indexOf(id) === -1) {
      localStorage.setItem("selectedMovies", JSON.stringify([...storeIds, id]));
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
  }

  const ctxValue = {
    movieData: movieState.movieData,
    isFormOpen: movieState.isFormOpen,
    isSpinnerOpen: movieState.isSpinnerOpen,
    handleSelectedMovie: handleSelectedMovie,
    handleSubmit: handleSubmit,
  };
  return (
    <AppContext.Provider value={ctxValue}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}
