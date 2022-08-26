import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../contexts/jwtContext";
import { API } from "../services/API";
import "./EditGuitar.css"

const EditGuitar = () => {
  const { editingGuitar } = useContext(JwtContext);
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  const defaultValues = {
    name: editingGuitar.name,
    brand: editingGuitar.brand,
    strings: editingGuitar.strings,
    description: editingGuitar.description,
    price: editingGuitar.price,
    stock: editingGuitar.stock,
    image: editingGuitar.image,
  };

  const formSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("strings", data.strings);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("image", data.image[0]);
    API.patch(`/${editingGuitar.type}/${editingGuitar._id}`, formData).then(
      (res) => {
        navigate("/guitars");
      }
    );
  };

  return (
    <section className="editguitar">
      <h2>Edit guitar</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          {...register("name")}
          defaultValue={defaultValues.name}
        />
        <label htmlFor="brand">Brand</label>
        <input type="text" name="brand" id="brand" {...register("brand")}  defaultValue={defaultValues.brand}/>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          {...register("description")}  defaultValue={defaultValues.description}
        />
        <label htmlFor="strings">Strings</label>
        <input
          type="number"
          name="strings"
          id="strings"
          min={6}
          max={12}
          {...register("strings")}
          defaultValue={defaultValues.strings}
        />
        <label htmlFor="price">Price</label>
        <input type="text" name="price" id="price" {...register("price")}  defaultValue={defaultValues.price}/>
        <label htmlFor="image">Image</label>
        <input type="file" name="image" id="image" {...register("image")} />
        <label htmlFor="stock">Stock</label>
        <input type="checkbox" name="stock" id="stock" {...register("stock")}  defaultValue={defaultValues.stock}/>
        <button type="submit">Edit</button>
      </form>
    </section>
  );
};

export default EditGuitar;
