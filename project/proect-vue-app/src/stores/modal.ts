import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
 const isVis = ref(false);

 function modalVis() {
  isVis.value = true
 }

 function modalClose() {
  isVis.value = false
 }

 return { isVis, modalVis, modalClose }
})