import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme?.darkMode || false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const currentUser = { username: username };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      if (setUser) setUser(currentUser);
      navigate("/");
    } catch (err) {
      setError("Giriş yapılırken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] w-full flex items-center justify-center px-4 py-8">
      
      {/* Şık Giriş Kartı */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8">
        
        {/* Başlık ve İkon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 dark:bg-orange-950/50 rounded-full mb-3 text-orange-500">
            🎬
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            <span className="text-orange-500">TMDB</span> ile Giriş Yap
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Favorilerine ulaşmak ve içerikleri keşfetmek için hesabına giriş yap.
          </p>
        </div>

        {/* Hata Bildirimi */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm text-center font-medium">
            {error}
          </div>
        )}

        {/* Form Alanı */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Kullanıcı Adı */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Kullanıcı Adı (TMDB)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Örn: filmsever"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
            />
          </div>

          {/* Şifre */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
            />
          </div>

          {/* Giriş Butonu */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 mt-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        {/* Alt Yönlendirme Linki */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700/60 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Henüz hesabın yok mu?{" "}
            <Link to="/register" className="text-orange-500 font-bold hover:text-orange-600 hover:underline transition-all">
              Kayıt Ol
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}