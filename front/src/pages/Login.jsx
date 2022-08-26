import { useContext } from "react";
import { JwtContext } from "../contexts/jwtContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../services/API";
import "./Login.css";
import Swal from "sweetalert2";

const Login = () => {
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  const { setJwt, setUser } = useContext(JwtContext);

  const formSubmit = (formData) => {
    API.post("/user/login", formData).then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.userInDb));
      setJwt(res.data.token);
      setUser(res.data.userInDb);
      if (res.data.token) {
        navigate("/");
        Swal.fire("Bienvenido a la web, ya puedes crear y editar guitarras")
      }
    });
  };

  return (
    <section className="login">
      <h2>Please log in:</h2>
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
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
