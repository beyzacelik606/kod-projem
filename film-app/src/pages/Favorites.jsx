import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Giriş yapmış olan güncel kullanıcıyı alıyoruz
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchFavorites = async () => {
      // Eğer giriş yapmış bir kullanıcı yoksa aramayı durdur
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        // 2. API'ye filtre ekleyerek sadece bu kullanıcının favorilerini çekiyoruz
        const response = await fetch(`http://localhost:5000/favorites?userId=${currentUser.username}`);
        if (response.ok) {
          const data = await response.json();
          
          // MovieCard componentinin filmleri doğru gösterebilmesi için 
          // API'den gelen verideki "movieId" değerini "id" alanına eşliyoruz.
          const formattedData = data.map((item) => ({
            id: item.movieId,
            title: item.title,
            poster_path: item.poster_path,
            release_date: item.release_date
          }));

          setFavorites(formattedData);
        }
      } catch (error) {
        console.error("Favori filmler API'den çekilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Kullanıcı giriş yapmadıysa bu uyarı ekranını gösteriyoruz
  if (!currentUser) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#333" }}>
        <h2>Favorilerinizi görebilmek için lütfen önce giriş yapın! 🔑</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#333" }}>
        <h3>Favorileriniz yükleniyor...</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ marginBottom: "30px", color: "#333", fontFamily: "sans-serif" }}>
        Favori Filmlerim
      </h1>

      {/* Eğer kullanıcının favori listesi boşsa bu kutuyu göster */}
      {favorites.length === 0 ? (
        <div style={{ 
          marginTop: "50px", 
          padding: "40px 20px", 
          backgroundColor: "#f9f9f9", 
          borderRadius: "15px",
          display: "inline-block",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "1px solid #eee"
        }}>
          <span style={{ fontSize: "50px", display: "block", marginBottom: "15px" }}>🍿</span>
          <h3 style={{ color: "#333", margin: "0 0 10px 0", fontFamily: "sans-serif" }}>
            Henüz favori filminiz yok!
          </h3>
          <p style={{ color: "#777", fontSize: "14px", maxWidth: "320px", margin: "0 auto", lineHeight: "1.5" }}>
            Ana sayfaya gidip beğendiğiniz filmlerin detay sayfasına girerek onları listenize ekleyebilirsiniz.
          </p>
        </div>
      ) : (
        // Eğer API'den gelen favori filmler varsa listele
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "15px", 
          justifyContent: "center" 
        }}>
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}