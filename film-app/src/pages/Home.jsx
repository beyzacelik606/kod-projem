import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../redux/themeSlice";
import { getPopularMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Redux'tan koyu mod durumunu ve tetikleyici fonksiyonu çekiyoruz
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
    <div className={`p-5 text-center transition-all duration-300 min-h-screen ${
      darkMode ? "bg-[#121212] text-white" : "bg-white text-black"
    }`}>
      <h1 className="text-3xl font-bold mb-5 font-sans">
        Popüler Filmler
      </h1>

      {/* Koyu/Açık Mod Butonu (Tailwind sınıfları eklendi) */}
      <button 
        onClick={() => dispatch(toggleDarkMode())} 
        className="px-5 py-2.5 mb-5 cursor-pointer bg-amber-500 hover:bg-amber-600 border-none rounded-full text-white font-bold shadow-md transition-colors"
      >
        {darkMode ? "☀️ Açık Mod" : "🌙 Koyu Mod"}
      </button>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Film ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`px-5 py-3 w-80 rounded-full border-2 border-amber-500 outline-none text-base transition-colors ${
            darkMode ? "bg-gray-800 text-white placeholder-gray-400" : "bg-white text-black"
          }`}
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div className={`mt-10 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Aradığınız film bulunamadı... 🔍
          </div>
        )}
      </div>
    </div>
  );
}