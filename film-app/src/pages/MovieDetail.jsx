import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";

export default function MovieDetail() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Gelişmiş "Wow" Bildirim State'i (alert yerine çalışacak)
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Bildirimi ekranda gösterip 3 saniye sonra kapatan fonksiyon
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id); 
        setMovie(data);
      } catch (error) {
        console.error("Film detayları yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleAddToFavorites = async () => {
    if (!movie) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      // alert yerine modern kırmızı bildirim
      showToast("Favorilere film ekleyebilmek için lütfen önce giriş yapın! 🔑", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.username, 
          movieId: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date
        }),
      });

      if (response.ok) {
        // alert yerine modern yeşil bildirim
        showToast(`${movie.title} başarıyla favorilerinize eklendi! ⭐`, "success");
      } else {
        showToast("Favorilere eklenirken API tarafında bir sorun oluştu. ❌", "error");
      }
    } catch (error) {
      console.error("Favori API bağlantı hatası:", error);
      showToast("API sunucunuzun (json-server) açık olduğundan emin olun! 🔌", "error");
    }
  };

  if (loading) return <div style={{ textAlign: "center", padding: "50px", color: "white" }}>Yükleniyor...</div>;
  if (!movie) return <div style={{ textAlign: "center", padding: "50px", color: "white" }}>Film bulunamadı.</div>;

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : "https://via.placeholder.com/500x750?text=Afiş+Yok";

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto", color: "#333", position: "relative" }}>
      
      {/* 🚀 MODERN BİLDİRİM KUTUSU (WOW EFEKTİ) */}
      {toast.show && (
        <div style={{
          position: "fixed",
          top: "30px",
          right: "30px",
          backgroundColor: toast.type === "success" ? "#2ecc71" : "#e74c3c",
          color: "white",
          padding: "16px 28px",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          zIndex: 9999,
          fontWeight: "bold",
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          animation: "slideIn 0.3s ease-out",
          fontFamily: "sans-serif"
        }}>
          {toast.message}
        </div>
      )}

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