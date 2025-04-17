export const getGenres = async (): Promise<string[]> => {
 try {
  const fetchResponse = await fetch('https://cinemaguide.skillbox.cc/movie/genres', { credentials: 'include' });
  const response: string[] = await fetchResponse.json();
  return response;
 }
 catch (err) {
  throw new Error("genres response error");

 }
}