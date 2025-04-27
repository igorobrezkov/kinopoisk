<script setup lang="ts">
import { ref } from 'vue';
import { getGenres } from '../api/genres';
import Genre from "../components/Genre.vue";
import type { IGenres } from '../types/genres';
import HistoryImg from '../assets/images/genre5.png';
import HorrorImg from '../assets/images/genre_horror.png';
import ScifiImg from '../assets/images/genre7.png';
import StandUpImg from '../assets/images/genre_stend-up.png';
import FantasyImg from '../assets/images/genre_fantasy.png';
import DramaImg from '../assets/images/genre1.png';
import MysteryImg from '../assets/images/genre_mystery.png';
import FamilyImg from '../assets/images/genre4.png';
import ComedyImg from '../assets/images/genre2.png';
import RomanceImg from '../assets/images/genre_romance.png';
import MusicImg from '../assets/images/genre_music.png'; 
import CrimeImg from '../assets/images/genre3.png';
import TvMovieImg from '../assets/images/genre_tv-movie.png';
import DocumentaryImg from '../assets/images/genre_documentary.png';
import ActionImg from '../assets/images/genre_action.png';
import ThrillerImg from '../assets/images/genre6.png';
import WesternImg from '../assets/images/genre_western.png';
import AnimationImg from '../assets/images/genre_animation.png';
import WarImg from '../assets/images/genre_war.png'; 
import AdventureImg from '../assets/images/genre8.png';

const arrGenres = ref<IGenres[]>([]);

const loadGenres =  () => {
  getGenres().then(data => {
 
    data.forEach((item, index) => {

        let name: string | null = null;
        let src: string | null = null;
    
        switch (item) {
          case 'history':           
            name = 'Историческое';
            src = HistoryImg;
            break;
          case 'horror':
            name = 'Хоррор';
            src = HorrorImg;
            break;
          case 'scifi':
            name = 'Фантастика';
            src = ScifiImg;
            break;
          case 'stand-up':
            name = 'Стендап';
            src = StandUpImg;
            break;
          case 'fantasy':
            name = 'Фентэзи';
            src = FantasyImg;
            break; 
          case 'drama':
            name = 'Драма';
            src = DramaImg;
            break; 
           case 'mystery':
            name = 'Мистика';
            src = MysteryImg;
            break;  
          case 'family':
            name = 'Семейное';
            src = FamilyImg;
            break; 
          case 'comedy':
            name = 'Комедия';
            src = ComedyImg;
            break;  
           case 'romance':
            name = 'Романтика';
            src = RomanceImg;
            break;  
          case 'music':
            name = 'Мюзикл';
            src = MusicImg;
            break;   
          case 'crime':
            name = 'Детектив';
            src = CrimeImg;
            break;  
          case 'tv-movie':
            name = 'Телевизионные';
            src = TvMovieImg;
            break;
           case 'documentary':
            name = 'Документальные';
            src = DocumentaryImg;
            break;
            case 'action':
            name = 'Динамические';
            src = ActionImg;
            break;
           case 'thriller':
            name = 'Триллер';
            src = ThrillerImg;
            break; 
          case 'western':
            name = 'Вестерн';
            src = WesternImg;
            break;  
          case 'animation':
            name = 'Анимационные';
            src = AnimationImg;
            break;  
          case 'war':
            name = 'Военные';
            src = WarImg;
            break;   
           case 'adventure':
            name = 'Приключения';
            src = AdventureImg;
            break;                                                      
        }
        if (name !== null && src !== null) {
          arrGenres.value.push({img: src, title: name, id: index++, detail: item})
        } 
    })    
     
  })
}
loadGenres();

</script>

<template>
  <section class="genres">
    <div class="container">
      <h1 class="genres__title">Жанры фильмов</h1>
      <ul class="genres__list">
        <li class="genres__item" v-for="genre in arrGenres" :key="genre.id">
          <Genre
            :nameGenre="genre.title"
            :imgSrc="genre.img"
            :detailGenreId="genre.detail"
          />
        </li>
      </ul>
    </div>
  </section>
</template>