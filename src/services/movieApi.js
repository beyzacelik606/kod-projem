const READ_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzMyZmE3YjdkYWNlMTA2NzI2OTNiM2E5MjJiNjY1ZiIsIm5iZiI6MTc4MzQxNDg5OS4xOSwic3ViIjoiNmE0Y2MwNzM2Y2I3YjU2ZDdhZmIzYjY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.0CB1Gvqf-uJ-3HySdzoR_OSocdW9cYuSAlv-fZwx7rY";
const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${READ_ACCESS_TOKEN}`
};

// 1. Popüler Filmleri Getiren Fonksiyon (Türkçe Dili Eklendi)
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?language=tr-TR`, { headers });
  const data = await response.json();
  return data.results;
};

// 2. Film Detayını Getiren Fonksiyon (Türkçe Dili Eklendi)
export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?language=tr-TR`, { headers });
  const data = await response.json();
  return data;
};