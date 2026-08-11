import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../redux/themeSlice";
import { getPopularMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getPopularMovies();
      setPopularMovies(data);
    };
    fetchMovies();
  }, []);

  const filteredMovies = popularMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      minHeight: "100vh",
      padding: "20px",
      backgroundColor: darkMode ? "#121212" : "#f9fafb",
      color: darkMode ? "#ffffff" : "#000000",
      fontFamily: "sans-serif"
    }}>
      
      {/* BAŞLIK, BUTON VE ARAMA ÇUBUĞU (Hepsi ortalandı) */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "15px" }}>
          Popüler Filmler
        </h1>

        {/* Koyu Mod Butonu */}
        <button
          onClick={() => dispatch(toggleDarkMode())}
          style={{
            padding: "8px 20px",
            backgroundColor: "#f59e0b",
            color: "#ffffff",
            border: "none",
            borderRadius: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "15px" // Arama çubuğu ile arasına boşluk bırakır
          }}
        >
          {darkMode ? "☀️ Açık Mod" : "🌙 Koyu Mod"}
        </button>

        <br />

        {/* Arama Kutusu */}
        <input
          type="text"
          placeholder="Film ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 20px",
            width: "280px",
            borderRadius: "25px",
            border: "2px solid #f59e0b",
            outline: "none",
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000"
          }}
        />
      </div>

      {/* KARTLARIN YAN YANA DİZİLDİĞİ KUTU */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: "1100px",
        margin: "0 auto"
      }}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div style={{ marginTop: "30px", color: "#6b7280" }}>Film bulunamadı...</div>
        )}
      </div>
    </div>
  );
}