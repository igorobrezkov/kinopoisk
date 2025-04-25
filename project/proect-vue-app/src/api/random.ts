import axios from 'axios';
export const getRandomFilm = async () => {
 try {
  return await axios.get('https://cinemaguide.skillbox.cc/movie/random', { withCredentials: true });
 } catch (error: any) {
  console.log(error.message)
 }
}