import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRegistrationStore = defineStore('registration', () => {
 const isRegistration = ref(false);

 function userRegistration() {
  isRegistration.value = true
 }

 function userAuth() {
  isRegistration.value = false
 }
 return { isRegistration, userRegistration, userAuth }
})