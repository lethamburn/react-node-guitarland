import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../services/API";
import "./Register.css";
import Swal from "sweetalert2";

const Register = () => {
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  const formSubmit = (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar[0]);
    API.post("/user/register", formData).then((res) => {
      if (res) {
        navigate("/login");
        Swal.fire("Bienvenido, ya te puedes loguear con tus datos")
      }
    });
  };

  return (
    <section className="register">
      <h2>Please register:</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          {...register("username")}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          {...register("password")}
        />
        <label htmlFor="avatar">Avatar</label>
        <input type="file" id="avatar" name="avatar" {...register("avatar")} />
        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default Register;
