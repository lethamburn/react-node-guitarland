import { useState } from "react";
import { API } from "../services/API";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./NewGuitar.css";
const NewGuitar = () => {
  const { register, handleSubmit } = useForm();
  const [type, setType] = useState("acoustic")
  let navigate = useNavigate();


  const formSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("strings", data.strings);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("image", data.image[0]);

    API.post(`/${type}/create`, formData).then((res) => {
        navigate("/guitars")
    })
  }

  return (
    <section className="newguitar">
      <h2>Create Guitar:</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
      <label htmlFor="type">Type: {type}</label>
      <button type="button" onClick={() => setType("acoustic")}>Acoustic</button>
      <button type="button" onClick={() => setType("electric")}>Electric</button>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" {...register("name")} />
        <label htmlFor="brand">Brand</label>
        <input type="text" name="brand" id="brand" {...register("brand")} />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          {...register("description")}
        />
        <label htmlFor="strings">Strings</label>
        <input
          type="number"
          name="strings"
          id="strings"
          min={6}
          max={12}
          {...register("strings")}
        />
        <label htmlFor="price">Price</label>
        <input type="text" name="price" id="price" {...register("price")} />
        <label htmlFor="image">Image</label>
        <input type="file" name="image" id="image" {...register("image")} />
        <label htmlFor="stock">Stock</label>
        <input type="checkbox" name="stock" id="stock" {...register("stock")} />
        <button type="submit">Create</button>
      </form>
    </section>
  );
};

export default NewGuitar;
