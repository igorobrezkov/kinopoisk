
import { getProfile } from "../api/profile";
import { useAuthorizedStore } from "../stores/autorized";


export const checkedAuth = async (): Promise<boolean | string> => {
    const result = await getProfile();
    const authorized = useAuthorizedStore();
    if (!result) {
        authorized.userAuthLogout();
        return false;
    }
    else if (result) {
        authorized.userAuthorized();
        authorized.userAuthData(result.data);
        return result.data.surname;
    }
    return true
}

export const checked = async (): Promise<boolean | string> => {
    const auth = await checkedAuth();
    if (auth) {
        return auth
    }
    else return 'Войти'
}