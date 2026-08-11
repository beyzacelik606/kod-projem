import { useState } from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Görsel+Yok";

  return (
    <Link
      to={`/movie/${movie.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "160px",
        margin: "10px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        // BURASI HAREKET EFEKTİNİ VEREN KISIM
        transition: "all 0.3s ease-in-out",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered ? "0 12px 20px rgba(0, 0, 0, 0.2)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Film Resmi */}
      <div style={{ position: "relative", width: "100%", height: "220px", backgroundColor: "#e5e7eb" }}>
        <img
          src={posterUrl}
          alt={movie.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute",
          top: "6px",
          left: "6px",
          backgroundColor: "rgba(0,0,0,0.8)",
          color: "#fbbf24",
          fontSize: "11px",
          fontWeight: "bold",
          padding: "2px 6px",
          borderRadius: "4px"
        }}>
          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </div>
      </div>

      {/* Film İçeriği */}
      <div style={{ padding: "10px", textAlign: "left" }}>
        <h3 style={{
          fontSize: "13px",
          fontWeight: "bold",
          margin: "0 0 6px 0",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "#111827"
        }} title={movie.title}>
          {movie.title}
        </h3>

        <div style={{
          width: "100%",
          padding: "6px 0",
          backgroundColor: isHovered ? "#d97706" : "#f59e0b",
          color: "#ffffff",
          fontSize: "11px",
          fontWeight: "bold",
          borderRadius: "6px",
          textAlign: "center",
          transition: "background-color 0.3s ease"
        }}>
          Detayları Gör
        </div>
      </div>
    </Link>
  );
}