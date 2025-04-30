export const addFavorites = async (idF: string) => {
 try {
  await fetch('https://cinemaguide.skillbox.cc/favorites',
   {
    method:
     'POST',
    body: JSON.stringify({
     id: idF,
    }),
    headers: {
     'Content-type': 'application/json',
    },
    credentials: 'include',
   });
 }
 catch (err: any) {
  console.log(err.message)
 }
 return { succes: false }
}
