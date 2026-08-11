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
      <div className="p-10 text-center text-gray-800">
        <h2>Favorilerinizi görebilmek için lütfen önce giriş yapın! 🔑</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-800">
        <h3>Favorileriniz yükleniyor...</h3>
      </div>
    );
  }

  return (
    <div className="p-5 text-center">
      <h1 className="mb-[30px] text-gray-800 font-sans text-2xl font-bold">
        Favori Filmlerim
      </h1>

      {/* Eğer kullanıcının favori listesi boşsa bu kutuyu göster */}
      {favorites.length === 0 ? (
        <div className="mt-[50px] px-5 py-10 bg-gray-50 rounded-[15px] inline-block shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-200">
          <span className="text-[50px] block mb-[15px]">🍿</span>
          <h3 className="text-gray-800 mb-2.5 font-sans font-bold text-lg">
            Henüz favori filminiz yok!
          </h3>
          <p className="text-gray-500 text-[14px] max-w-[320px] mx-auto leading-relaxed">
            Ana sayfaya gidip beğendiğiniz filmlerin detay sayfasına girerek onları listenize ekleyebilirsiniz.
          </p>
        </div>
      ) : (
        // Eğer API'den gelen favori filmler varsa listele
        <div className="flex flex-wrap gap-[15px] justify-center">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}