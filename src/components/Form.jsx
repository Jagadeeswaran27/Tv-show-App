import { useContext } from "react";
import { AppContext } from "../context-file/App-Context";
export default function Form() {
  const { handleSubmit, movieData } = useContext(AppContext);
  const storeIds = JSON.parse(localStorage.getItem("selectedMovies")) || [];
  console.log("stored id : " + storeIds);
  const filteredArray = movieData.filter((data) =>
    storeIds.includes(data.score)
  );
  console.log(filteredArray);
  return (
    <>
      {filteredArray.map((data) => {
        return (
          <form key={data.score} onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input type="text" defaultValue={data.show.name} />
            </div>
            <div>
              <label>Language</label>
              <input type="text" defaultValue={data.show.language} />
            </div>
            <div>
              <label>Premiered</label>
              <input defaultValue={data.show.premiered} />
            </div>
            <div>
              <label>Ended</label>
              <input defaultValue={data.show.ended || "ongoing"} />
            </div>
            <div>
              <label>Runtime</label>
              <input defaultValue={data.show.runtime || "not provied"} />
            </div>
            <div>
              <label>Rating</label>
              <input
                defaultValue={data.show.rating.average || "not yet rated!"}
              />
            </div>
            <div>
              <label>Type</label>
              <input defaultValue={data.show.type} />
            </div>
            <button type="button">submit</button>
          </form>
        );
      })}
    </>
  );
}
