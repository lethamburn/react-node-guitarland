import "./GuitarCard.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../contexts/jwtContext";
import { API } from "../services/API";
import Swal from "sweetalert2";

const GuitarCard = ({ guitar }) => {
  const { user, setEditingGuitar } = useContext(JwtContext);
  let navigate = useNavigate();

  const deleteGuitar = () => {
    Swal.fire({
      title: "¿Estas seguro de borrar la guitarra?",
      text: "No la vas a poder recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrala!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (guitar.type === "acoustic") {
          API.delete(`/acoustic/${guitar._id}`).then((res) => {
            window.location.reload();
          });
        } else {
          API.delete(`/electric/${guitar._id}`).then((res) => {
            window.location.reload();
          });
        }
      }
    });
  };

  const editGuitar = (guitar) => {
    setEditingGuitar(guitar);
    navigate("/editguitar");
    console.log(guitar);
  };

  return (
    <figure className="guitarcard">
      <img src={guitar.image} alt={guitar.name} />
      <h4 className="brand">{guitar.brand}</h4>
      <h4 className="name">{guitar.name}</h4>
      <p>{guitar.description}</p>
      <p>{guitar.strings} strings</p>
      <p className="price">{guitar.price} €</p>
      {guitar.stock ? (
        <p className="stock">In stock</p>
      ) : (
        <p className="out">Out of stock</p>
      )}
      {user ? (
        <>
          <button onClick={() => editGuitar(guitar)}>Edit</button>
          <button onClick={() => deleteGuitar()}>Delete</button>
        </>
      ) : null}
    </figure>
  );
};

export default GuitarCard;
