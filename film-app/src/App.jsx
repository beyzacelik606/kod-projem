import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";

// Sayfa İçe Aktarmaları
import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Favorites from "./pages/Favorites.jsx";
import Login from "./pages/Login.jsx";
import RegisterPage from "./pages/RegisterPage.jsx"; 

function App() {
  // Koyu mod durumu
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 🚀 Giriş yapmış kullanıcıyı takip eden durum (Sayfa yenilense bile hafızadan okur)
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  });

  // Koyu moda göre değişen renk ayarları
  const theme = {
    navBg: isDarkMode ? "#222" : "#ffffff", 
    textColor: isDarkMode ? "#ffffff" : "#4a4a4a", 
    borderColor: isDarkMode ? "#333" : "#e0e0e0", 
    accentColor: "#ff9800",
  };

  // 🚀 Çıkış yapma fonksiyonu
  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // Aktif kullanıcıyı hafızadan sil
    setUser(null); // Üst menünün anında güncellenmesi için durumu sıfırla
  };

  return (
    <BrowserRouter>
      {/* Navigasyon Menüsü */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: theme.navBg, 
        borderBottom: `1px solid ${theme.borderColor}`,
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        transition: "background-color 0.3s ease, border-color 0.3s ease"
      }}>
        
        {/* Sol Taraf: Mısır Emojisi ve Linkler */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span style={{ fontSize: "1.5rem" }}>🍿</span>
          
          <Link to="/" style={{ 
            textDecoration: "none", 
            color: theme.textColor,       
            fontWeight: "bold",     
            fontSize: "16px",
          }}>
            Ana Sayfa
          </Link>
          
          <Link to="/favorites" style={{ 
            textDecoration: "none", 
            color: theme.textColor, 
            fontWeight: "bold", 
            fontSize: "16px",
          }}>
            Favoriler
          </Link>
        </div>

        {/* Sağ Taraf: Dinamik Butonlar ve Koyu Mod Ayarı */}
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          
          {/* Gece/Gündüz Modu Butonu */}
          <button onClick={() => setIsDarkMode(!isDarkMode)} style={{
            backgroundColor: "transparent",
            border: "none",
            color: theme.textColor,
            fontSize: "1.2rem",
            cursor: "pointer",
            marginRight: "5px",
            padding: "5px"
          }}>
             {isDarkMode ? "💡" : "🌙"}
          </button>

          {/* 🚀 DİNAMİK ALAN: Eğer kullanıcı giriş yapmışsa adını ve Çıkış Yap butonunu göster */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ color: theme.textColor, fontSize: "14px", fontWeight: "500" }}>
                Hoş geldin, <strong style={{ color: theme.accentColor }}>{user.username}</strong>
              </span>
              <button onClick={handleLogout} style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: `1px solid ${theme.accentColor}`,
                backgroundColor: "transparent",
                color: theme.accentColor,
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                transition: "0.2s"
              }}>
                Çıkış Yap
              </button>
            </div>
          ) : (
            /* 🚀 Kullanıcı giriş yapmamışsa eski Giriş Yap / Kayıt Ol butonlarını göster */
            <>
              <Link to="/login" style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid #ccc",
                backgroundColor: "transparent",
                color: theme.textColor,
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500"
              }}>
                Giriş Yap
              </Link>
              
              <Link to="/register" style={{
                padding: "8px 16px",
                borderRadius: "20px",
                backgroundColor: theme.accentColor, 
                color: "white",
                border: "none",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "14px"
              }}>
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
        
        {/* 🚀 Login sayfasına kullanıcı durumunu değiştirebilmesi için setUser fonksiyonunu gönderiyoruz */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;