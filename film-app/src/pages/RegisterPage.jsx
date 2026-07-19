import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  // Kullanıcının yazdığı verileri tutacağımız state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // İnputlara yazı yazıldıkça state'i güncelleyen fonksiyon
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Forma tıklandığında çalışacak fonksiyon (Şimdilik sadece konsola yazdırır)
  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    console.log("Kayıt bilgileri:", formData);
    alert("Form başarıyla çalışıyor! Bilgiler konsola yazdırıldı.");
    // İleride buraya backend/API kodlarını ekleyeceğiz
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px', 
          padding: '40px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
          width: '350px',
          backgroundColor: '#fff' 
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#333', margin: '0' }}>Hesap Oluştur</h2>
        
        <input 
          type="text" 
          name="username" 
          placeholder="Kullanıcı Adı" 
          value={formData.username}
          onChange={handleChange}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
          required 
        />
        
        <input 
          type="email" 
          name="email" 
          placeholder="E-posta Adresi" 
          value={formData.email}
          onChange={handleChange}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
          required 
        />
        
        <input 
          type="password" 
          name="password" 
          placeholder="Şifre" 
          value={formData.password}
          onChange={handleChange}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
          required 
        />
        
        <button 
          type="submit" 
          style={{ 
            padding: '14px', 
            borderRadius: '8px', 
            border: 'none', 
            backgroundColor: '#ff9800', // Sitenin turuncu rengi
            color: 'white', 
            fontWeight: 'bold', 
            fontSize: '16px',
            cursor: 'pointer',
            transition: '0.3s'
          }}
        >
          Kayıt Ol
        </button>

        <div style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
          Zaten hesabın var mı? <Link to="/login" style={{ color: '#ff9800', fontWeight: 'bold', textDecoration: 'none' }}>Giriş Yap</Link>
        </div>
      </form>
    </div>
  );
}