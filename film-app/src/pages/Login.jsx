import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  createRequestToken, 
  validateTokenWithLogin, 
  createSession 
} from "../services/authenticationApi";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Adım: Request Token Al
      const requestToken = await createRequestToken();

      // 2. Adım: Kullanıcı Adı ve Şifre ile Doğrula
      const validationData = await validateTokenWithLogin(username, password, requestToken);

      if (validationData.success) {
        // 3. Adım: Session ID Oluştur
        const sessionId = await createSession(requestToken);
        
        // Session ID'yi ve Kullanıcıyı Sakla
        localStorage.setItem("session_id", sessionId);
        localStorage.setItem("user", JSON.stringify({ username }));

        alert("Giriş Başarılı!");
        navigate("/");
      } else {
        setError("Kullanıcı adı veya şifre hatalı! (TMDB hesabınızla giriş yapmalısınız)");
      }
    } catch (err) {
      setError("Giriş yapılırken bir hata oluştu. Lütfen bilgilerinizi kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>TMDB ile Giriş Yap</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>Kullanıcı Adı (TMDB):</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Şifre:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}