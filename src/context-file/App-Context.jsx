import { createContext } from "react";
export const AppContext = createContext({
  movieData: [],
  selectedScore: null,
  isFormOpen: false,
  handleSelectedMovie: () => {},
  handleSubmit: () => {},
});
