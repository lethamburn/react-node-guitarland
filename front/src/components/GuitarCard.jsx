import "./GuitarCard.css";

const GuitarCard = ({ guitar }) => {
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
    </figure>
  );
};

export default GuitarCard;
