import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/movieApi";

export default function Home() {
  const [movies, setMovies] = useState([]); // Filmleri burada saklayacağız

  useEffect(() => {
    // Sayfa açıldığında bu işlemler yapılacak
    const fetchMovies = async () => {
      const popularMovies = await getPopularMovies(); // Veriyi çek
      setMovies(popularMovies); // Çektiğin veriyi kutuya koy
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Popüler Filmler</h1>
      <div style={{ display: "grid", gap: "20px" }}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>Yayın Tarihi: {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}