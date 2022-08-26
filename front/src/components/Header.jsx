import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { JwtContext } from "../contexts/jwtContext";


const Header = () => {
  const { user, logout } = useContext(JwtContext);
  let navigate = useNavigate();
  return (
    <header>
      <nav>
        <h1>Guitarland</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/guitars">Guitars</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/newguitar">Create Guitar</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </>
          ) : null}
        </ul>
        <div className="control">
          {user ? (
            <>
              <p>Welcome {user.username}</p>
              {user.avatar !== "undefined" ? (
                <img src={user?.avatar} alt="User Avatar" />
              ) : null}

              <button onClick={() => logout() & navigate("/login")}>Logout</button>
            </>
          ) : (
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
