import axios from "axios";
import { apiKey } from '../constants'

//endpoints 

const apibaseUtl = "https://api.themoviedb.org/3";

const trendingMoviesEndpoint = `${apibaseUtl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apibaseUtl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apibaseUtl}/movie/top_rated?api_key=${apiKey}`

// dynamic endpoints
const movieDetailsEndpoint = id => `${apibaseUtl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id => `${apibaseUtl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id => `${apibaseUtl}/movie/${id}/similar?api_key=${apiKey}`;
const personDetailsEndpoint = id => `${apibaseUtl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = id => `${apibaseUtl}/person/${id}/movie_credits?api_key=${apiKey}`;
const serachMoviesEndpoint = `${apibaseUtl}/search/movie?api_key=${apiKey}`;


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}` : null

export const fallbackMoviePoster =  '../assets/images/image1.jpeg';
export const fallbaclPersonImage =  '../assets/images/fallbackPersonImage.jpg';


const apiCall = async (endpoint , params) => {
    const options = {
        method : 'GET',
        url: endpoint,
        params: params? params : {}
    }

    try {
        const response =  await axios.request(options);
        return response.data;
        
    } catch (error) {
       console.log('error: ' ,error);
       return {}; 

    }

}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomigMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id));
}
 
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id));
}
export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id));
}
export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id));
}
export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id));
}
export const searchMovies = params => {
    return apiCall(serachMoviesEndpoint,params);
}