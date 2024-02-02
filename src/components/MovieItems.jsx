import { useContext } from "react";
import { AppContext } from "../context-file/App-Context";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
export default function MovieItems() {
  const { movieData, handleSelectedMovie, isFormOpen, selectedId } =
    useContext(AppContext);
  return (
    <main className="movies-container">
      {isFormOpen ? (
        <LoadingSpinner />
      ) : (
        movieData.map((data) => {
          const image = data.show.image;
          return (
            <NavLink to={`/movies/${data.show.id}`} key={data.show.id}>
              <div
                onClick={() => handleSelectedMovie(data.show.id)}
                className="movie-card-main"
              >
                <div>
                  {image !== null ? (
                    <img
                      src={image.original}
                      className="image"
                      width="200px"
                      height="250px"
                    />
                  ) : (
                    <div className="no-image">no image is found</div>
                  )}
                </div>
                <h2>{data.show.name}</h2>
                <div className="genre">
                  {data.show.genres.map((genre, index) => (
                    <p key={index}>{genre}</p>
                  ))}
                </div>
                <button>Show Summary</button>
              </div>
            </NavLink>
          );
        })
      )}
    </main>
  );
}
