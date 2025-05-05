import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
 const isVis = ref(false);
 const isVisTrailer = ref(false);

 function modalVis() {
  isVis.value = true
 }

 function modalVisTrailer() {
  isVisTrailer.value = true
 }

 function modalClose() {
  isVis.value = false
 }

 function modalCloseTrailer() {
  isVisTrailer.value = false
 }
 return { isVis, isVisTrailer, modalVisTrailer, modalCloseTrailer, modalVis, modalClose, }
})