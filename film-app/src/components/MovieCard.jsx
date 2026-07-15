function MovieCard({ movie }) {
  if (!movie) return null;

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", borderRadius: "8px" }}>
      <h3>{movie.title}</h3>
      <p>Yayın Tarihi: {movie.release_date}</p>
    </div>
  );
}

export default MovieCard;