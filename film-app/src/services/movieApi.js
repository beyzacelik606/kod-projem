const API_KEY = "BURAYA_ANAHTARINI_YAZ";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const response = await fetch(${BASE_URL}/movie/popular?api_key=${API_KEY});
    const data = await response.json();
    return data.results;
};