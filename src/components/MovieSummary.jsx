import { useContext } from "react";
import { AppContext } from "../context-file/App-Context";
import { NavLink } from "react-router-dom";

export default function MovieSummary() {
  const { movieData } = useContext(AppContext);
  const storeIds = JSON.parse(localStorage.getItem("selectedMovies")) || [];
  const filteredArray = movieData.filter((data) =>
    storeIds.includes(data.show.id)
  );
  function stripHtmlTags(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  return (
    <>
      <div className="summary-container">
        {filteredArray.map((data) => {
          const image = data.show.image;
          const summary = stripHtmlTags(data.show.summary);
          return (
            <div className="selected-container" key={data.score}>
              <div>
                {image !== null ? (
                  <img
                    src={image.original}
                    className="selected-image"
                    alt={data.show.name}
                  />
                ) : (
                  <div className="selected-no-image">no image is found</div>
                )}
                <p>{data.show.name}</p>
              </div>
              <p>{summary}</p>
              <div className="summary-btn-container">
                <NavLink to="/movies/:id/form">
                  <button>Book Now!</button>
                </NavLink>
                <NavLink to="/">
                  <button>go back</button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
