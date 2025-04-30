<script setup lang="ts">
import { useModalStore } from "../stores/modal"; 
import { storeToRefs } from "pinia";
import { ref, watch} from "vue"
import CloseModal from "../assets/images/svg-sprite/close_modal.svg";
import { usePlayer, PlayerState } from '@vue-youtube/core';
import ButtonTrailerPause from "../assets/images/svg-sprite/trailer_pause.svg";
import ButtonTrailerPlay from "../assets/images/svg-sprite/trailer_play.svg"
const player = ref(undefined);
const idVideo = ref();
const eventTarget = ref();
const visTitle = ref(false);
const showBtnPause = ref(false);
const showBtnPlay = ref(false);
const goTrailer = ref();
const { isVisTrailer } = storeToRefs(useModalStore());
const { modalCloseTrailer } = useModalStore();

const props = defineProps({
 idVideo: String,
 tittleVideo: String
})

idVideo.value =  props.idVideo;
    const { onReady, onStateChange  } = usePlayer(idVideo.value, player, {
    playerVars: {
     iv_load_policy: 3,
     controls: 0,
      autoplay: 0, 
      mute: 1, 
      showinfo: 0,
      playsinline: 0,
      modestbranding: 0,
      rel: 0,
     },
    cookie: false,
     width: 960,    
     height: 540,    
    });

onStateChange((event) => {
    if (event.data == PlayerState.PLAYING) {
     console.log('onStateChange') 
     visTitle.value = false;
     showBtnPause.value = false; 
     showBtnPlay.value = false;
     goTrailer.value = true;    
 }
 if (event.data == PlayerState.PAUSED) {
  visTitle.value = true;
  showBtnPause.value = true;
   showBtnPlay.value = true;
  goTrailer.value = false;
 }   
    
})

onReady((event) => {
 eventTarget.value = event.target
})

watch(isVisTrailer, (oldVal, newVal) => {
 if (oldVal === true) {
   eventTarget.value?.playVideo()
 }
 else if (newVal === true) {
   eventTarget.value?.stopVideo()
 }
    
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
    <div class="modal__main-trailer" @mouseover="showPauseTrailer"   @mouseout="hiddenPauseTrailer" >
      <div class="modal__content-trailer" @mouseover="showPlayTrailer"   @mouseout="hiddenPlayTrailer" @focus="showPlayTrailer" @focusout="hiddenPlayTrailer">
          <div ref="player"/>
           <h2 class="modal-trailer__title" v-show="visTitle"> {{ tittleVideo }}</h2>
           
           <span v-show="showBtnPause, !goTrailer" @click="pausePlayVidio"  class="modal-trailer__pause"><ButtonTrailerPause /></span>
           <span v-show="showBtnPlay" @click="goPlayVidio" class="modal-trailer__play"><ButtonTrailerPlay /></span>
           
      </div>
      <CloseModal @click="modalCloseTrailer" class="modal__close" />
      
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
</style>