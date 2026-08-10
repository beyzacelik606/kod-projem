const READ_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzMyZmE3YjdkYWNlMTA2NzI2OTNiM2E5MjJiNjY1ZiIsIm5iZiI6MTc4MzQxNDg5OS4xOSwic3ViIjoiNmE0Y2MwNzM2Y2I3YjU2ZDdhZmIzYjY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.0CB1Gvqf-uJ-3HySdzoR_OSocdW9cYuSAlv-fZwx7rY";
const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
  Authorization: `Bearer ${READ_ACCESS_TOKEN}`
};

// 1. Adım: Geçici Request Token alma (Create Request Token)
export const createRequestToken = async () => {
  const response = await fetch(`${BASE_URL}/authentication/token/new`, { headers });
  const data = await response.json();
  return data.request_token;
};

// 2. Adım: Kullanıcı adı ve şifre ile Token doğrulama (Validate Key / Login)
export const validateTokenWithLogin = async (username, password, requestToken) => {
  const response = await fetch(`${BASE_URL}/authentication/token/validate_with_login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      username: username,
      password: password,
      request_token: requestToken
    })
  });
  const data = await response.json();
  return data;
};

// 3. Adım: Session ID üretme (Create Session)
export const createSession = async (requestToken) => {
  const response = await fetch(`${BASE_URL}/authentication/session/new`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      request_token: requestToken
    })
  });
  const data = await response.json();
  return data.session_id;
};