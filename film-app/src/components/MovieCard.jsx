import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Afiş+Yok";

  // IMDb puanını virgülden sonra tek hane olacak şekilde düzenleyelim
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        width: "200px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        position: "relative",
        transition: "all 0.3s ease",
        cursor: "pointer",
        textDecoration: "none", // Kartın içindeki yazıların altının çizilmesini önler
        display: "block",       // Tasarımın div gibi düzgün durmasını sağlar
        color: "inherit"        // Yazı renklerinin varsayılan mavi link rengi olmasını engeller
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.05)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      }}
    >
      {/* SARI IMDb PUAN ROZETİ */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          color: "#ffc107",
          fontWeight: "bold",
          padding: "4px 8px",
          borderRadius: "6px",
          fontSize: "12px",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}
      >
        ⭐ {rating}
      </div>

      <img
        src={posterUrl}
        alt={movie.title}
        style={{
          width: "100%",
          borderRadius: "8px"
        }}
      />

      <h3
        style={{
          fontSize: "15px",
          margin: "10px 0 5px 0",
          color: "#333"
        }}
      >
        {movie.title}
      </h3>

      <p
        style={{
          fontSize: "12px",
          color: "#666",
          margin: "0 0 10px 0"
        }}
      >
        Yayın Tarihi: {movie.release_date}
      </p>

      {/* Tıklama işini artık üstteki Link üstlendiği için burayı normal div yaptık */}
      <div
        style={{
          display: "inline-block",
          padding: "6px 12px",
          backgroundColor: "#ff9800",
          color: "#fff",
          borderRadius: "5px",
          fontWeight: "bold",
          fontSize: "12px"
        }}
      >
        Detayları Gör
      </div>
    </Link>
  );
}

export default MovieCard;