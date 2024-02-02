import { createContext } from "react";
export const AppContext = createContext({
  movieData: [],
  isFormOpen: false,
  isSpinnerOpen: false,
  handleSelectedMovie: () => {},
  handleSubmit: () => {},
});
