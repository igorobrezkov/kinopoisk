import axios from 'axios';
export const logOut = async () => {
 try {
  return await axios.get('https://cinemaguide.skillbox.cc/auth/logout', { withCredentials: true });
 } catch (error: any) {
  console.log(error.message)
 }
}