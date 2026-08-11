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
    <div className="py-10 px-5 max-w-[400px] w-full mx-auto my-[50px] text-center relative box-border font-sans">
      
      {/* 🚀 MODERN BİLDİRİM KUTUSU */}
      {toast.show && (
        <div
          className={`fixed top-[30px] right-[30px] text-white px-7 py-4 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.2)] z-[9999] font-bold text-[15px] font-sans ${
            toast.type === "success" ? "bg-[#2ecc71]" : "bg-[#e74c3c]"
          }`}
        >
          {toast.message}
        </div>
      )}

      <h2 className="mb-5 text-gray-800 font-sans text-2xl font-bold">Kayıt Ol</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-[15px] w-full">
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded-[5px] border border-gray-300 text-[14px] w-full box-border outline-none focus:border-red-500"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-[5px] border border-gray-300 text-[14px] w-full box-border outline-none focus:border-red-500"
        />
        <button
          type="submit"
          className="p-3 bg-[#e50914] text-white border-none rounded-[5px] cursor-pointer font-bold text-[15px] w-full transition-colors hover:bg-red-700"
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}