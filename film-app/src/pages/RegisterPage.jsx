import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🚀 MODERN BİLDİRİM STATE'İ
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      showToast("Lütfen tüm alanları doldurun! ⚠️", "error");
      return;
    }

    try {
      // Önce bu kullanıcı adı daha önce alınmış mı diye kontrol edelim
      const checkResponse = await fetch(`http://localhost:5000/users?username=${username}`);
      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        showToast("Bu kullanıcı adı zaten alınmış! Başka bir tane deneyin. ❌", "error");
        return;
      }

      // Yeni kullanıcıyı API'ye kaydedelim
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        showToast("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz... 🎉", "success");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        showToast("Kayıt sırasında bir hata oluştu. ❌", "error");
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
      showToast("Sunucu bağlantı hatası! API açık mı? 🔌", "error");
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "400px", width: "100%", margin: "50px auto", textAlign: "center", position: "relative", boxSizing: "border-box" }}>
      
      {/* 🚀 MODERN BİLDİRİM KUTUSU */}
      {toast.show && (
        <div style={{
          position: "fixed",
          top: "30px",
          right: "30px",
          backgroundColor: toast.type === "success" ? "#2ecc71" : "#e74c3c",
          color: "white",
          padding: "16px 28px",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          zIndex: 9999,
          fontWeight: "bold",
          fontSize: "15px",
          fontFamily: "sans-serif"
        }}>
          {toast.message}
        </div>
      )}

      <h2 style={{ marginBottom: "20px", color: "#333", fontFamily: "sans-serif" }}>Kayıt Ol</h2>
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "100%" }}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px", width: "100%", boxSizing: "border-box" }}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px", width: "100%", boxSizing: "border-box" }}
        />
        <button type="submit" style={{ padding: "12px", backgroundColor: "#e50914", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", fontSize: "15px", width: "100%" }}>
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}