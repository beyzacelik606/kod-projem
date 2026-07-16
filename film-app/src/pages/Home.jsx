import { useState, useEffect } from "react";
import { getPopularMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getPopularMovies();
      setPopularMovies(data);
    };
    fetchMovies();
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const filteredMovies = popularMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", textAlign: "center", transition: "all 0.3s" }}>
      <h1 style={{ marginBottom: "20px", fontFamily: "sans-serif" }}>
        Popüler Filmler
      </h1>

      {/* Koyu/Açık Mod Butonu */}
      <button onClick={toggleTheme} style={{
        padding: "10px 20px",
        marginBottom: "20px",
        cursor: "pointer",
        backgroundColor: "#ff9800",
        border: "none",
        borderRadius: "20px",
        color: "white",
        fontWeight: "bold",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        {darkMode ? "☀️ Açık Mod" : "🌙 Koyu Mod"}
      </button>

      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Film ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px 20px",
            width: "320px",
            borderRadius: "25px",
            border: "2px solid #ff9800",
            outline: "none",
            fontSize: "16px"
          }}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div style={{ marginTop: "40px", color: "#666" }}>Aradığınız film bulunamadı... 🔍</div>
        )}
      </div>
    </div>
  );
}