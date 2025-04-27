import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthorizedStore = defineStore('authorized', () => {
 const authorized = ref(false);
 const authData = ref();

 function userAuthorized() {
  authorized.value = true;
 }

 function userAuthLogout() {
  authorized.value = false;
 }

 function userAuthData(val: object) {
  authData.value = val
 }

 return { authorized, userAuthorized, userAuthLogout, authData, userAuthData }
})