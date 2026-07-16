import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";

export default function MovieDetail() {
  const { id } = useParams(); // URL'den film ID'sini alıyoruz
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id); // Detayları API'den çekiyoruz
        setMovie(data);
      } catch (error) {
        console.error("Film detayları yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  // LocalStorage kullanarak favoriye ekleme fonksiyonu (Hocanın özel isteği!)
  const handleAddToFavorites = () => {
    if (!movie) return;
    const currentFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    
    // Eğer film zaten favorilerde yoksa ekle
    if (!currentFavs.some((fav) => fav.id === movie.id)) {
      const updatedFavs = [...currentFavs, {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date
      }];
      localStorage.setItem("favorites", JSON.stringify(updatedFavs));
      alert("Film favorilere eklendi! ⭐");
    } else {
      alert("Bu film zaten favorilerinizde! 😊");
    }
  };

  if (loading) return <div style={{ textAlign: "center", padding: "50px", color: "white" }}>Yükleniyor...</div>;
  if (!movie) return <div style={{ textAlign: "center", padding: "50px", color: "white" }}>Film bulunamadı.</div>;

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : "https://via.placeholder.com/500x750?text=Afiş+Yok";

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto", color: "#333" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#e50914", fontWeight: "bold", display: "inline-block", marginBottom: "20px" }}>
        ← Anasayfaya Dön
      </Link>
      
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        <img src={posterUrl} alt={movie.title} style={{ width: "300px", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }} />
        
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h1 style={{ margin: "0 0 10px 0" }}>{movie.title}</h1>
          <p style={{ fontStyle: "italic", color: "#666" }}>{movie.tagline}</p>
          
          <div style={{ margin: "20px 0" }}>
            <p><strong>Yayın Tarihi:</strong> {movie.release_date}</p>
            <p><strong>Puan:</strong> ⭐ {movie.vote_average?.toFixed(1)} / 10</p>
            <p><strong>Süre:</strong> {movie.runtime} dakika</p>
          </div>

          <h3>Özet</h3>
          <p style={{ lineHeight: "1.6" }}>{movie.overview || "Bu film için henüz Türkçe özet bulunmuyor."}</p>

          <button 
            onClick={handleAddToFavorites}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: "#ffc107",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
            }}
          >
            ⭐ Favorilere Ekle
          </button>
        </div>
      </div>
    </div>
  );
}