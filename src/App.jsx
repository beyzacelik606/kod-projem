import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";

// Sayfa İçe Aktarmaları
import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Favorites from "./pages/Favorites.jsx";
import Login from "./pages/Login.jsx";
import RegisterPage from "./pages/RegisterPage.jsx"; 

function App() {
  // Redux'tan koyu mod durumunu çekiyoruz
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  // Giriş yapmış kullanıcıyı takip eden durum
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  });

  // Çıkış yapma fonksiyonu
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("session_id");
    setUser(null);
  };

  return (
    <BrowserRouter>
      {/* Navigasyon Menüsü */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          borderBottom: `1px solid ${isDarkMode ? "#333333" : "#e0e0e0"}`,
          backgroundColor: isDarkMode ? "#222222" : "#ffffff",
          color: isDarkMode ? "#ffffff" : "#4a4a4a",
          fontFamily: "sans-serif"
        }}
      >
        {/* Sol Taraf: Mısır Emojisi ve Linkler */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ fontSize: "24px" }}>🍿</span>

          <Link
            to="/"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
              color: isDarkMode ? "#ffffff" : "#4a4a4a"
            }}
          >
            Ana Sayfa
          </Link>

          <Link
            to="/favorites"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
              color: isDarkMode ? "#ffffff" : "#4a4a4a"
            }}
          >
            Favoriler
          </Link>
        </div>

        {/* Sağ Taraf: Dinamik Butonlar */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* Kullanıcı giriş durumu */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ fontSize: "14px", fontWeight: "500", color: isDarkMode ? "#ffffff" : "#4a4a4a" }}>
                Hoş geldin, <strong style={{ color: "#ff9800" }}>{user.username}</strong>
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: "1px solid #ff9800",
                  backgroundColor: "transparent",
                  color: "#ff9800",
                  fontWeight: "bold",
                  fontSize: "14px",
                  cursor: "pointer"
                }}
              >
                Çıkış Yap
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  backgroundColor: "transparent",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: isDarkMode ? "#ffffff" : "#4a4a4a"
                }}
              >
                Giriş Yap
              </Link>

              <Link
                to="/register"
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  backgroundColor: "#ff9800",
                  color: "#ffffff",
                  border: "none",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Sayfa Yönlendirmeleri */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;