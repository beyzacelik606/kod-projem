import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites'; // Favoriler sayfamızı içeri aldık

function App() {
  return (
    <BrowserRouter>
      {/* Üst Menü Barı */}
      <nav style={{
        display: "flex",
        gap: "25px",
        padding: "15px 30px",
        backgroundColor: "#111",
        color: "white",
        alignItems: "center"
      }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "20px" }}>
          🍿 Film Rehberi
        </Link>
        <Link to="/favorites" style={{ color: "#ffc107", textDecoration: "none", fontWeight: "bold" }}>
          ⭐ Favorilerim
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} /> {/* Favoriler sayfa yolu */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;