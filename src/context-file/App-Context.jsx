import { createContext } from "react";
export const AppContext = createContext({
  movieData: [],
  selectedId: null,
  isFormOpen: false,
  isSpinnerOpen: false,
  handleSelectedMovie: () => {},
  handleSubmit: () => {},
});
