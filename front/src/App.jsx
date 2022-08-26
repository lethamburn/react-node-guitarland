import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { JwtContextProvider } from "./contexts/jwtContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Guitars from "./pages/Guitars";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewGuitar from "./pages/NewGuitar";
import EditGuitar from "./pages/EditGuitar";
import RequireAuth from "./components/RequiredAuth";

const App = () => {
  return (
    <JwtContextProvider>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guitars" element={<Guitars />} />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/newguitar"
              element={
                <RequireAuth>
                  <NewGuitar />
                </RequireAuth>
              }
            />
            <Route
              path="/editguitar"
              element={
                <RequireAuth>
                  <EditGuitar />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          <Footer />
        </Router>
      </div>
    </JwtContextProvider>
  );
};

export default App;
