export const delFavorites = async (id: string) => {
    try {
        await fetch('https://cinemaguide.skillbox.cc/favorites/' + id,
            {
                method:
                    'DELETE',
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