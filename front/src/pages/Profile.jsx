import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../contexts/jwtContext";
import { API } from "../services/API";
import Swal from "sweetalert2";
import "./Profile.css";


const Profile = () => {
  const { user, logout } = useContext(JwtContext);
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  const defaultValues = {
    username: user.username,
  };

  const formSubmit = (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("avatar", data.avatar[0]);
    API.patch(`/user/${user._id}`, formData).then((res) => {
      logout();
      if (res) {
        navigate("/login");
        Swal.fire("Profile edited, please log in again");
      }
    });
  };
  return (
    <section className="profile">
      <h2>Profile</h2>
      <img src={user.avatar} alt="User avatar" />
      <form onSubmit={handleSubmit(formSubmit)}>
        <input
          type="text"
          id="username"
          name="username"
          {...register("username")}
          defaultValue={defaultValues.username}
        />
        <input type="file" id="avatar" name="avatar" {...register("avatar")} />
        <button type="submit">Edit Profile</button>
      </form>
    </section>
  );
};

export default Profile;
