<script setup lang="ts">
import { ref  } from "vue";
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
import ModalTrailer from "./ModalTrailer.vue";
import { useModalStore } from "../stores/modal";
import {getStyle, toHoursAndMinutes, genre, getGenreTitle, genreTitle} from "../api/function"
const { isVisTrailer } = storeToRefs(useModalStore());

const goVideoTrailer = () => {
  if (!isVisTrailer.value) {
    useModalStore().modalVisTrailer();
 }
}

const { authorized } = storeToRefs(useAuthorizedStore());
const { isFavorites, addFaforites } = useFavoritesStore();
const valueBtnAccent = ref("Трейлер");
const valueBtnDefault = ref("О фильме");
const favorite = ref("favorite");
const cinemaGuide = "cinema-guide";

addFaforites();
const props = defineProps({
  showBtn: Boolean,
  idFilm:  Promise<Number> ,
});

const emit = defineEmits(['film-data']);


const promised = ref();
 genreTitle.value = [];

const film = async (id: Promise<Number>) => {
  async function oF(strId: string) {
      const res = await getMovieId(strId);
    let obj = { id: undefined, title: undefined, posterUrl: undefined, plot: undefined, tmdbRating: undefined, releaseYear: undefined, runtime: undefined, genres: undefined };
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
          if (typeof val == 'number')
          obj = Object.assign(obj, { tmdbRating: val.toFixed(1).toString(), style: getStyle(val) });
          break;
        case 'runtime':
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
  if (authorized.value) {
      if (favorite.value === 'favorite') {
    await addFavorites(val.toString());
  }
  else if (favorite.value === 'favorite-add') {
    await delFavorites(val.toString());
  }
  addFaforites();
  }  
  else if (!authorized.value) {
     useModalStore().modalVis();
  }
 
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
            <Rating v-if="promised" :rating="promised.data?.tmdbRating" :class="promised.data?.style"/>
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
          <li class="film__item">
            <BtnCircle  :componentName="favorite" @click=" filmFavorites(promised.data.id)"/>
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