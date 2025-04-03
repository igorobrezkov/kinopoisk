import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRegistrationStore = defineStore('registration', () => {
 const isRegistration = ref(false);

 return { isRegistration }
})