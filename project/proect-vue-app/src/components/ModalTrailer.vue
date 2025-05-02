<script setup lang="ts">
import { useModalStore } from "../stores/modal"; 
import { storeToRefs } from "pinia";
import { ref, defineAsyncComponent, watch } from "vue"
import CloseModal from "../assets/images/svg-sprite/close_modal.svg";
import ButtonTrailerPause from "../assets/images/svg-sprite/trailer_pause.svg";
import ButtonTrailerPlay from "../assets/images/svg-sprite/trailer_play.svg";
import  ErrorLoadingTrailer from './Error.vue';
import LoadingTrailer from "./LoadingTrailer.vue";



const TrailerYoutube = defineAsyncComponent({
 loader: () => import('./YoutubeTrailer.vue'),
 loadingComponent: LoadingTrailer,
  delay: 200,
 errorComponent: ErrorLoadingTrailer,
 timeout: 3000
}
)

const youtubeIsLoadding = ref(false)
const eventTarget = ref();
const visTitle = ref(false);
const showBtnPause = ref(false);
const showBtnPlay = ref(false);
const goTrailer = ref();
const visTextBlockedYoutebe = ref(false);
const { isVisTrailer } = storeToRefs(useModalStore());
const { modalCloseTrailer } = useModalStore();


const youtubeLoadding = () => {

 setTimeout(() => {
  if (eventTarget.value == undefined) {
   youtubeIsLoadding.value = true;
     setTimeout(() => {
      if (eventTarget.value == undefined) {
        youtubeIsLoadding.value = false;
        visTextBlockedYoutebe.value = true;
    }
   }, 5000) 
  }
  else {
   youtubeIsLoadding.value = false;
  }
  }, 1000)
}
watch(eventTarget, () => {
  youtubeLoadding();
}, { immediate: true })

defineProps({
 idVideo: String,
 tittleVideo: String
})

const showPlayTrailer = () => {
 if (goTrailer.value === false) {
   showBtnPlay.value = true
 }  
}

const showPauseTrailer = () => {
 if (goTrailer.value === true) {
   showBtnPause.value = true
 }  
}

const hiddenPlayTrailer = () => {
 showBtnPlay.value = false
}

const hiddenPauseTrailer = () => {
 showBtnPause.value = false
}

const goPlayVidio = () => {
   eventTarget.value?.playVideo()
}

const pausePlayVidio = () => {
   eventTarget.value?.pauseVideo()
}
</script>

<template>
  <div class="modal-trailer" :class="{ 'modal--vis': isVisTrailer }">
    <div class="modal__main-trailer" @mouseover="showPauseTrailer"   @mouseout="hiddenPauseTrailer"  >
      <div class="modal__content-trailer" @mouseover="showPlayTrailer"   @mouseout="hiddenPlayTrailer" @focus="showPlayTrailer" @focusout="hiddenPlayTrailer">
          <TrailerYoutube :idVideoY="idVideo" :tittleVideoY="tittleVideo"
           @event="ev=> eventTarget = ev"
           @btn-play="play => showBtnPlay = play"
           @btn-pause="pause => showBtnPause = pause"
           @go-trailer="go => goTrailer = go" 
           @vis-title="title => visTitle = title"
           />                    
           <h2 class="modal-trailer__title" v-show="visTitle"> {{ tittleVideo }}</h2>
           <h2 class="modal-trailer__title-error" v-show="visTextBlockedYoutebe">Похоже, что в вашем регионе ютюб заблокирован</h2>
            <span v-show="showBtnPause, !goTrailer" @click="pausePlayVidio"  class="modal-trailer__pause"><ButtonTrailerPause /></span>
            <span v-show="showBtnPlay" @click="goPlayVidio" class="modal-trailer__play"><ButtonTrailerPlay /></span>        
            <LoadingTrailer v-show="youtubeIsLoadding"/>
      </div>
      <CloseModal @click="modalCloseTrailer" class="modal__close--trailer" />
      
    </div>
  </div>
</template>

<style scoped>
  .modal__content-trailer{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .modal-trailer__title {
   margin: 0;
   padding: 0;
   padding: 24px 40px;
   position: absolute;
   bottom: 24px;
   left: 20px;
   right: 20px;
   background: rgba(10, 11, 11, 0.5);
   font-weight: 700;
   font-size: 24px;
   line-height: 133%;
   color: #fff;
   z-index: 99;
   width: 920px;
   justify-self: center;
  }

  .modal-trailer__play,
  .modal-trailer__pause {
   position: absolute;
   top: 50%;
   transform: translate(-50%, -50%);
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 40px;
   padding: 8px;
   width: 80px;
   height: 80px;
   background: #fff;
   cursor: pointer;
  }
  .modal-trailer__title-error {
   font-weight: 700;
   font-size: 24px;
   line-height: 133%;
   color: #fff;
  }
</style>