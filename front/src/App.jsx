import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home"
import Guitars from "./pages/Guitars"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NewGuitar from "./pages/NewGuitar"
import EditGuitar from "./pages/EditGuitar"

const App = () => {
  return <div>
  <Router>
  <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/guitars" element={<Guitars/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/newguitar" element={<NewGuitar />} />
      <Route path="/editguitar" element={<EditGuitar/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>

  <Footer/>
  </Router>
  </div>;
};

export default App;
