import { createContext } from "react";
export const AppContext = createContext({
  movieData: [],
  selectedScore: null,
  isFormOpen: false,
  isSpinnerOpen: false,
  handleSelectedMovie: () => {},
  handleSubmit: () => {},
});
