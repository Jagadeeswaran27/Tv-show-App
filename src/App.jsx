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
    selectedScore: null,
    isFormOpen: false,
  });
  const router = createBrowserRouter([
    {
      path: "./",
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        { path: "./", element: <MovieItems /> },
        {
          path: `./movies/:id`,
          element: <MovieSummary />,
        },
        { path: "./movies/:id/form", element: <Form /> },
      ],
    },
  ]);
  useEffect(() => {
    //this is for initially fetching all data from the api
    async function getData() {
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
      }
    }
    getData();
  }, []);
  function handleSelectedMovie(score) {
    setMovieState((prev) => {
      return {
        ...prev,
        selectedScore: score,
      };
    });
    const storeIds = JSON.parse(localStorage.getItem("selectedMovie")) || [];
    if (storeIds.indexOf(score) === -1) {
      localStorage.setItem(
        "selectedMovies",
        JSON.stringify([...storeIds, score])
      );
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
  }

  const ctxValue = {
    movieData: movieState.movieData,
    selectedScore: movieState.selectedScore,
    isFormOpen: movieState.isFormOpen,
    handleSelectedMovie: handleSelectedMovie,
    handleSubmit: handleSubmit,
  };
  return (
    <AppContext.Provider value={ctxValue}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}
