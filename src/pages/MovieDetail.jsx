import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";

export default function MovieDetail() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

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
        showToast(`${movie.title} başarıyla favorilerinize eklendi! ⭐`, "success");
      } else {
        showToast("Favorilere eklenirken API tarafında bir sorun oluştu. ❌", "error");
      }
    } catch (error) {
      console.error("Favori API bağlantı hatası:", error);
      showToast("API sunucunuzun (json-server) açık olduğundan emin olun! 🔌", "error");
    }
  };

  if (loading) return <div className="text-center p-12 text-white">Yükleniyor...</div>;
  if (!movie) return <div className="text-center p-12 text-white">Film bulunamadı.</div>;

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : "https://via.placeholder.com/500x750?text=Afiş+Yok";

  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-800 relative">
      
      {/* BİLDİRİM KUTUSU */}
      {toast.show && (
        <div
          className={`fixed top-8 right-8 text-white px-7 py-4 rounded-lg shadow-2xl z-50 font-bold text-base flex items-center gap-3 ${
            toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <Link
        to="/"
        className="no-underline text-red-600 font-bold inline-block mb-5 hover:underline"
      >
        ← Anasayfaya Dön
      </Link>
      
      <div className="flex gap-8 flex-wrap">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-72 rounded-xl shadow-lg"
        />
        
        <div className="flex-1 min-w-[300px]">
          <h1 className="m-0 mb-3 text-3xl font-bold">{movie.title}</h1>
          <p className="italic text-gray-500 mb-4">{movie.tagline}</p>
          
          <div className="my-5 space-y-2">
            <p><strong>Yayın Tarihi:</strong> {movie.release_date}</p>
            <p><strong>Puan:</strong> ⭐ {movie.vote_average?.toFixed(1)} / 10</p>
            <p><strong>Süre:</strong> {movie.runtime} dakika</p>
          </div>

          <h3 className="font-bold text-lg mb-2">Özet</h3>
          <p className="leading-relaxed text-gray-600">{movie.overview || "Bu film için henüz Türkçe özet bulunmuyor."}</p>

          <button 
            onClick={handleAddToFavorites}
            className="mt-6 px-6 py-3 bg-amber-400 border-none rounded-lg text-base font-bold cursor-pointer shadow-md transition-all hover:bg-amber-500"
          >
            ⭐ Favorilere Ekle
          </button>
        </div>
      </div>
    </div>
  );
}