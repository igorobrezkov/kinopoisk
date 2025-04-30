import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getFavorites } from '../api/favorites/getFavorites';

export const useFavoritesStore = defineStore('favorites', () => {
 const favorites = ref<string[]>([]);

 function userFavorites(id: string) {
  favorites.value.push(id);
 }


 function isFavorites(id: string): boolean {
  return favorites.value.includes(id);
 }

 function addFaforites() {
  favorites.value = [];
  getFavorites().then(data => {
   if (data !== undefined) {
    for (let i of data.data) {
     userFavorites(i.id)
    }
   }
  })
 }

 return { favorites, userFavorites, isFavorites, addFaforites }
})