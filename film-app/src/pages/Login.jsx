import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      showToast("Lütfen tüm alanları doldurun! ⚠️", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users");
      if (response.ok) {
        const users = await response.json();

        const foundUser = users.find(
          (u) => u.username.trim().toLowerCase() === username.trim().toLowerCase() && 
                 String(u.password).trim() === password.trim()
        );

        if (foundUser) {
          localStorage.setItem("currentUser", JSON.stringify(foundUser));
          
          if (setUser) {
            setUser(foundUser);
          }

          showToast("Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz... 🚀", "success");
          
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          showToast("Kullanıcı adı veya şifre hatalı! ❌", "error");
        }
      } else {
        showToast("Sunucu yanıt vermedi. ❌", "error");
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      showToast("Sunucu bağlantı hatası! API açık mı? 🔌", "error");
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "400px", width: "100%", margin: "50px auto", textAlign: "center", position: "relative", boxSizing: "border-box" }}>
      
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

      <h2 style={{ marginBottom: "20px", color: "#333", fontFamily: "sans-serif" }}>Giriş Yap</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "100%" }}>
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
          Giriş Yap
        </button>
      </form>
    </div>
  );
}