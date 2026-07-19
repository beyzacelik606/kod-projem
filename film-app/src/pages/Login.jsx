import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Buraya bir sonraki adımda localstorage kontrolünü ekleyeceğiz.
    console.log("Giriş yapılmaya çalışılıyor:", username, password);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      color: "#fff"
    }}>
      <form onSubmit={handleLogin} style={{
        backgroundColor: "#1a1a1a",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        width: "320px",
        border: "1px solid #333",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "20px", color: "#ff9800" }}>Giriş Yap</h2>
        
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#ccc" }}>Kullanıcı Adı</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "#fff",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#ccc" }}>Şifre</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "#fff",
              boxSizing: "border-box"
            }}
          />
        </div>

        <button type="submit" style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#ff9800",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background 0.2s"
        }}>
          Giriş Yap
        </button>

        <p style={{ marginTop: "15px", fontSize: "13px", color: "#aaa" }}>
          Hesabın yok mu? <Link to="/register" style={{ color: "#ff9800", textDecoration: "none", fontWeight: "bold" }}>Kayıt Ol</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;