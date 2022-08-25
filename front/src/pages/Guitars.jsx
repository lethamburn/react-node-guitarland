import { useEffect, useState } from "react";
import GuitarCard from "../components/GuitarCard";
import SearchBar from "../components/SearchBar";
import { API } from "../services/API";
import "./Guitars.css";

const Guitars = () => {
  const [allGuitars, setAllGuitars] = useState([]);
  const [filterWord, setFilterWord] = useState("");

  const filteredGuitars = allGuitars.filter(
    (guitar) =>
      guitar.name.toLowerCase().includes(filterWord) ||
      guitar.brand.toLowerCase().includes(filterWord) ||
      guitar.description.toLowerCase().includes(filterWord)
  );

  const getAllGuitars = async () => {
    API.get("/electric").then((resElectric) =>
      API.get("/acoustic").then((resAcoustic) => {
        setAllGuitars([
          ...resElectric.data.electrics,
          ...resAcoustic.data.acoustics,
        ]);
      })
    );
  };

  useEffect(() => {
    getAllGuitars();
  }, []);

  return (
    <section className="guitars">
      <h2>Guitars</h2>
      <SearchBar setFilterWord={setFilterWord} />
      <div className="gallery">
        {allGuitars.length ? (
          filteredGuitars.map((guitar) => (
            <GuitarCard guitar={guitar} key={guitar._id} />
          ))
        ) : (
          <p>Loading guitars...</p>
        )}
      </div>
      {!filteredGuitars.length ? <p>Guitar not found</p> : null}
    </section>
  );
};

export default Guitars;
