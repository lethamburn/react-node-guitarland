import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <section className="home">
      <h1>Welcome to Guitarland</h1>
      <img src="./images/logo.png" alt="Guitarland logo" />
      <Link to="/login">Do you have an account?</Link>
    </section>
  );
};

export default Home;
