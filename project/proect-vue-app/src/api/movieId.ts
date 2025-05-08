import axios from 'axios';
export const getMovieId = async (movieId: string) => {
    try {
        return await axios.get(`https://cinemaguide.skillbox.cc/movie/${movieId}`, { withCredentials: true });
    } catch (error: any) {
        console.log(error.message);
    }
}