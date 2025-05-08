import axios from 'axios';
export const getMovie = async (querry: string) => {
    try {
        return await axios.get('https://cinemaguide.skillbox.cc/movie/?' + querry, { withCredentials: true });
    } catch (error: any) {
        console.log(error.message);
    }
}