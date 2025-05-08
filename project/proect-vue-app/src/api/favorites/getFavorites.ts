import axios from 'axios';
export const getFavorites = async () => {
    try {
        return await axios.get('https://cinemaguide.skillbox.cc/favorites', { withCredentials: true });
    } catch (error: any) {
        console.log(error.message)
    }
}