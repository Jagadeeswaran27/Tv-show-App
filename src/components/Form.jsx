import { useContext } from "react";
import { AppContext } from "../context-file/App-Context";
import { NavLink } from "react-router-dom";
export default function Form() {
  const { handleSubmit, movieData } = useContext(AppContext);
  const storeIds = JSON.parse(localStorage.getItem("selectedMovies")) || [];
  const filteredArray = movieData.filter((data) =>
    storeIds.includes(data.show.id)
  );
  return (
    <>
      {filteredArray.map((data) => {
        return (
          <form key={data.score} onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input type="text" defaultValue={data.show.name} readOnly />
            </div>
            <div>
              <label>Language</label>
              <input type="text" defaultValue={data.show.language} readOnly />
            </div>
            <div>
              <label>Premiered</label>
              <input
                defaultValue={data.show.premiered || "data not provided"}
                readOnly
              />
            </div>
            <div>
              <label>Ended</label>
              <input defaultValue={data.show.ended || "ongoing"} readOnly />
            </div>
            <div>
              <label>Runtime</label>
              <input
                defaultValue={data.show.runtime || "not provied"}
                readOnly
              />
            </div>
            <div>
              <label>Rating</label>
              <input
                defaultValue={data.show.rating.average || "not yet rated!"}
                readOnly
              />
            </div>
            <div>
              <label>Type</label>
              <input defaultValue={data.show.type} readOnly />
            </div>
            <button type="button">submit</button>
            <NavLink to={`/movies/${data.show.id}`}>
              <button>Go Back</button>
            </NavLink>
          </form>
        );
      })}
    </>
  );
}
