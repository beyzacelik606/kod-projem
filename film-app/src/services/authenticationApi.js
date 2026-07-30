const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzMyZmE3YjdkYWNlMTA2NzI2OTNiM2E5MjJiNjY1ZiIsIm5iZiI6MTc4MzQxNDg5OS4xOSwic3ViIjoiNmE0Y2MwNzM2Y2I3YjU2ZDdhZmIzYjY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.0CB1Gvqf-uJ-3HySdzoR_OSocdW9cYuSAlv-fZwx7rY'; // Buraya kendi TMDB API anahtarını koyabilirsin
const BASE_URL = 'https://api.themoviedb.org/3';

// 1. Adım: Geçici İstek Token'ı Al
export const getRequestToken = async () => {
  const response = await fetch(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
  const data = await response.json();
  return data.request_token;
};

// 2. Adım: Kullanıcı Adı ve Şifre ile Token'ı Doğrula
export const validateWithLogin = async (username, password, requestToken) => {
  const response = await fetch(`${BASE_URL}/authentication/token/validate_with_login?api_key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password,
      request_token: requestToken,
    }),
  });
  const data = await response.json();
  return data;
};

// 3. Adım: Oturum (Session ID) Oluştur
export const createSession = async (requestToken) => {
  const response = await fetch(`${BASE_URL}/authentication/session/new?api_key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      request_token: requestToken,
    }),
  });
  const data = await response.json();
  return data.session_id;
};