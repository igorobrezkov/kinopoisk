
export const getAuth = async (em: string, pass: string): Promise<{ succes: boolean } | { error: string }> => {
    try {
        const response = await fetch('https://cinemaguide.skillbox.cc/auth/login',
            {
                method:
                    'POST',
                body: JSON.stringify({
                    email: em,
                    password: pass,

                }),
                headers: {
                    'Content-type': 'application/json',
                },
                credentials: 'include',
            });
        const res = await response.json();
        return res;
    }
    catch (err: any) {
        console.log(err.message)
    }
    return { succes: false }
}

