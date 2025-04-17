
export const getUser = async (em: string, pass: string, nam: string, sur: string): Promise<{ succes: boolean } | { error: string }> => {
 try {
  const response = await fetch('https://cinemaguide.skillbox.cc/user',
   {
    method:
     'POST',
    body: JSON.stringify({
     email: em,
     password: pass,
     name: nam,
     surname: sur
    }),
    headers: {
     'Content-type': 'application/json',
     credentials: 'include'
    }
   });
  const res = await response.json();
  return res;
 }
 catch (err: any) {
  console.log(err.message)
 }
 return { succes: false }
}

