import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Tarayıcının hafızasından (LocalStorage) favori filmleri çekiyoruz
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ marginBottom: "30px", color: "#333", fontFamily: "sans-serif" }}>
        Favori Filmlerim
      </h1>

      {/* SİHİRLİ KONTROL: Eğer favori listesi boşsa bu şık uyarı kutusunu göster */}
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
            Ana sayfaya gidip beğendiğiniz filmlerin altındaki "Detayları Gör" butonuna tıklayarak onları listenize ekleyebilirsiniz.
          </p>
        </div>
      ) : (
        // Eğer favori listesinde en az 1 film varsa onları yan yana listele
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