import axios from 'axios';
export const getTop10 = async () => {
    try {
        return await axios.get('https://cinemaguide.skillbox.cc/movie/top10', { withCredentials: true });
    } catch (error: any) {
        console.log(error.message);
    }
}