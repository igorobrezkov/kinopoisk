import axios from 'axios';
export const getProfile = async () => {
 try {
  return await axios.get('https://cinemaguide.skillbox.cc/profile', { withCredentials: true });
 } catch (error: any) {
  if (error.status == '401') {
   console.log('Пользователь не авторизован');
  }
  else {
   throw error
  }

 }
}