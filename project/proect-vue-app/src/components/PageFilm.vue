<script setup lang="ts">
import { ref } from "vue";
import Rating from "./Rating.vue";
import BtnAccent from "./BtnAccent.vue";
import BtnDefault from "./BtnDefault.vue";
import BtnCircle from "./BtnCircle.vue";
import { getMovieId } from "../api/movieId"
import { addFavorites } from "../api/favorites/addFavorites";
import { delFavorites } from "../api/favorites/delFavorites";
import { usePromise } from 'vue-promised';
import { getRandomFilm } from "../api/random";
import { storeToRefs } from "pinia";
import { useAuthorizedStore } from "../stores/autorized";
import { useFavoritesStore } from "../stores/favorites";
import { usePlayer } from '@vue-youtube/core';
import ModalTrailer from "./ModalTrailer.vue";
import { useModalStore } from "../stores/modal";
const { isVisTrailer } = storeToRefs(useModalStore());

const goVideoTrailer = () => {
  if (!isVisTrailer.value) {
    useModalStore().modalVisTrailer();
 }
}

const player = ref();
const trailerId = ref('dQw4w9WgXcQ');

const { authorized } = storeToRefs(useAuthorizedStore());
const { isFavorites, addFaforites } = useFavoritesStore();
const valueBtnAccent = ref("Трейлер");
const valueBtnDefault = ref("О фильме");
const favorite = ref("favorite");
const cinemaGuide = "cinema-guide";
const { onReady } = usePlayer(trailerId.value, player);
onReady((event) => {
  // Start playing the video when the player is ready*
  event.target.playVideo();
})


addFaforites();
const props = defineProps({
  showBtn: Boolean,
  idFilm:  Promise<Number> ,
});

const emit = defineEmits(['film-data']);


const promised = ref();
const genreTitle = ref<string[]>([])

const genre = (item: string) => {
   switch (item) {
     case 'history': 
          if (!genreTitle.value.includes(item))          
            genreTitle.value.push('историческое');
            break;
     case 'horror':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('хоррор');
            break;
     case 'scifi':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('фантастика');
            break;
     case 'stand-up':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('комедия');
            break;
     case 'fantasy':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('фентэзи');
            break; 
     case 'drama':
            if (!genreTitle.value.includes(item))  
           genreTitle.value.push('драма');
            break; 
     case 'mystery':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('мистика');
            break;  
     case 'family':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('семейное');
            break; 
     case 'comedy':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('комедия');
            break;  
     case 'romance':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('романтика');
            break;  
     case 'music':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('мюзикл');
            break;   
     case 'crime':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('детектив');
            break;  
     case 'tv-movie':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('телевизионные');
            break;
     case 'documentary':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('документальные');
            break;
     case 'action':
              if (!genreTitle.value.includes(item))  
            genreTitle.value.push('динамические');
            break;
     case 'thriller':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('триллер');
            break; 
     case 'western':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('вестерн');
            break;  
     case 'animation':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('анимационные');
            break;  
     case 'war':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('военные');
            break;   
     case 'adventure':
            if (!genreTitle.value.includes(item))  
            genreTitle.value.push('приключения');
            break;                                                      
        }
}
const getGenreTitle = () => {
  return genreTitle.value.join(', ');
}

const film = async (id: Promise<Number>) => {
  async function oF(strId: string) {
      const res = await getMovieId(strId);
    let obj: { id: number | undefined; title: string | undefined; posterUrl: string | undefined; plot: string | undefined; tmdbRating: string | undefined; releaseYear: string | undefined; runtime: string | undefined; genres: [] | undefined} =
      { id: undefined, title: undefined, posterUrl: undefined, plot: undefined, tmdbRating: undefined, releaseYear: undefined, runtime: undefined, genres: undefined };
   
    trailerId.value = res?.data.trailerYouTubeId 
    let entries = Object.entries(res?.data);
    for (let [key, val] of entries) {
      switch (key) {
        case 'id':
          obj = Object.assign(obj, { id: val });
          break;
        case 'trailerUrl':
          obj = Object.assign(obj, { trailer: val }); 
          break;  
         case 'trailerYouTubeId':
          obj = Object.assign(obj, { trailerYouTubeId: val }); 
          break;   
        case 'title':
          obj = Object.assign(obj, { title: val });
          break;
        case 'backdropUrl':
          obj = Object.assign(obj, { posterUrl: val });
          break;
        case 'plot':
          function clampString(inputString: string, maxLength: number) {
            let regexp = new RegExp(`((.{${maxLength - 3}})...)(.+)`, "s");
            return inputString.replace(regexp, (m, g1, g2, g3) => g3 ? g2 + "..." : g1);
          }
          if (typeof val == 'string') {
            const minVal = clampString(val, 65)
             obj = Object.assign(obj, { descPlot: minVal }); 
          }
          
          obj = Object.assign(obj, { plot: val }); 
          break;
        case 'homepage':
          obj = Object.assign(obj, { homepage: val }); 
          break;  
         case 'director':
          obj = Object.assign(obj, { director: val });
          break;
          case 'language':
          obj = Object.assign(obj, { language: val }); 
          break;
           case 'budget':
          obj = Object.assign(obj, { budget: val }); 
          break;  
           case 'production':
          obj = Object.assign(obj, { production: val }); 
          break; 
           case 'revenue':
          obj = Object.assign(obj, { revenue: val }); 
          break;  
          case 'awardsSummary':
          obj = Object.assign(obj, { awardsSummary: val }); 
          break; 
        case 'genres':
          type arr = string[] | any;
          let arrVal: arr = val
          for (let item of arrVal) {
            genre(item);
          }       
          break;
        case 'releaseYear':
          obj = Object.assign(obj, { releaseYear: val });
          break;  
        case 'tmdbRating':
          const getStyle = (rating: number): string => {
            
            if (rating >= 8) return 'yelow';
            else if (rating < 8 && rating >= 7) return 'green';
            else if (rating < 7 && rating > 5) return 'gray';
            else if (rating < 5) return 'red';  
            else return 'more'                         
          }
          if (typeof val == 'number')
          obj = Object.assign(obj, { tmdbRating: val.toString(), style: getStyle(val) });
          break;
        case 'runtime':
          const toHoursAndMinutes = (TotalMinutes: number) => {
          const minutes = TotalMinutes % 60;
          const hours = Math.floor(TotalMinutes / 60);
    
          return `${(hours)} ч ${(minutes)} мин`
          }
          if (typeof val == 'number') {
            const nVal: number = val;
            obj = Object.assign(obj, { runtime: toHoursAndMinutes(nVal) });
          }
          break;    
      }

    }
    return obj;
  }
      const res_1 = await id;
      const strId_1 = res_1.toString();
      return await oF(strId_1);
}

const goRandomFilm = (idF: Promise<Number> | undefined) => {
   if (idF !== undefined ) {
     return usePromise(film(idF))
     }
}
const goNewFilm = async () => {
  genreTitle.value = [];
  const randomFilm = getRandomFilm();

const getId = async() => {
  return randomFilm.then(res => {
  return res?.data.id;
})
}
  promised.value = goRandomFilm(await getId());
  emit('film-data', promised);
}

promised.value = goRandomFilm(props.idFilm);
emit('film-data', promised.value);


const showBtnDefault = ref(false);
if (props.showBtn) {
  showBtnDefault.value = props.showBtn;
}


const filmFavorites = async (val: string) => {    
  if (favorite.value === 'favorite') {
    await addFavorites(val.toString());
  }

  else if (favorite.value === 'favorite-add') {
    await delFavorites(val.toString());
  }
  addFaforites();
}

const  checkedFavoeite =  (val: string) => {
  if (isFavorites(val)) {
    favorite.value = 'favorite-add';
    return isFavorites(val); 
  }
  else {
    favorite.value = 'favorite';
    return isFavorites(val);
  } 
}

</script>

<template>
  <div class="film" >
     {{ checkedFavoeite(promised.data?.id) }}  
    <div class="film__wrap">
      <div class="film__content" >
        <ul class="rating" >
          <li class="rating__item">
            <Rating v-if="promised" :rating="promised.data?.tmdbRating" :class="promised.data?.style "/>
          </li>
          <li class="rating__item">{{ promised.data?.releaseYear }}</li> 
          <li class="rating__item"> {{ getGenreTitle() }}</li>
          <li class="rating__item">{{ promised.data?.runtime }}</li> 
        </ul>
        <h1 class="film__title" v-if="promised"> {{ promised.data?.title }} </h1>
        <p class="film__desc" v-if="promised">
          {{ promised.data?.descPlot }}
        </p>
        <ul class="film__navigation">
          <li class="film__item">
            <BtnAccent :text="valueBtnAccent"  @click="goVideoTrailer"/>
            <ModalTrailer v-if="promised.data?.trailerYouTubeId" :idVideo="promised.data?.trailerYouTubeId" :tittleVideo="promised.data?.title"/>
          </li>
          <li class="film__item">
            <BtnDefault
              :text="valueBtnDefault"
              :filmId="promised.data?.id"
              v-if="showBtnDefault"
            />
          </li>
          <li v-if="authorized" class="film__item">
            <BtnCircle :componentName="favorite" @click=" filmFavorites(promised.data.id)"/>
          </li>
          <li class="film__item s">
            <BtnCircle :componentName="cinemaGuide" v-if="showBtnDefault" @click="goNewFilm"/>
          </li>
        </ul>
      </div>
      <div class="film__item">
        <img v-if="promised"
          class="film__preview-img"
          :src="promised.data?.posterUrl"
          :alt="promised.data?.title"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .yelow {
    background-color: #A59400;
  }
  .green {
    background-color: #308e21;
  }
  .gray {
    background-color: #777777;
  }
  .red {
    background-color: #C82020;
  }
</style>