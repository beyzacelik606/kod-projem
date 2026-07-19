import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Favorites from "./pages/Favorites.jsx";
import Login from "./pages/Login.jsx";
// İŞTE BURAYI DEĞİŞTİRDİK: Dosyanın yeni adı "RegisterPage.jsx" oldu
import RegisterPage from "./pages/RegisterPage.jsx"; 

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "15px", padding: "15px", alignItems: "center" }}>
        <Link to="/">Ana Sayfa</Link>
        <Link to="/favorites">Favoriler</Link>
        
        <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
          <Link to="/login" style={{
            backgroundColor: "#ff9800",
            padding: "6px 15px",
            borderRadius: "6px",
            fontSize: "14px",
            color: "white",
            textDecoration: "none"
          }}>
            Giriş Yap
          </Link>

          <Link to="/register" style={{
            backgroundColor: "#333", 
            padding: "6px 15px",
            borderRadius: "6px",
            fontSize: "14px",
            color: "white",
            textDecoration: "none"
          }}>
            Kayıt Ol
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        {/* BURAYI DA DEĞİŞTİRDİK: Bileşen adı "RegisterPage" oldu */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;