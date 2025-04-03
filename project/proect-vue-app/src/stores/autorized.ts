import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthorizedStore = defineStore('authorized', () => {
 const authorized = ref(false);

 return { authorized }
})