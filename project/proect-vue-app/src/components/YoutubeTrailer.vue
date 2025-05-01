<script setup lang="ts">
import { useModalStore } from "../stores/modal"; 
import { storeToRefs } from "pinia";
import { ref, watch} from "vue"
import { usePlayer, PlayerState } from '@vue-youtube/core';
const player = ref(undefined);
const idVideo = ref();
const eventTarget = ref();
const { isVisTrailer } = storeToRefs(useModalStore());

const props = defineProps({
 idVideoY: String,
 tittleVideoY: String,
})

const emits = defineEmits(['event', 'btn-play', 'btn-pause', 'go-trailer', 'vis-title']);

idVideo.value =  props.idVideoY;
    const { onReady, onStateChange } = usePlayer(idVideo.value, player, {
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
    
     emits('btn-play', false);  
     emits('btn-pause', false); 
     emits('go-trailer', true)
     emits('vis-title', false)
      
 }
 if (event.data == PlayerState.PAUSED) {
    
     emits('vis-title', true);
     emits('btn-pause', true);
     emits('btn-play', true);
     emits('go-trailer', false)
 }   
})

onReady((event) => {
 eventTarget.value = event.target;
 emits('event', eventTarget.value);
})

watch(isVisTrailer, (oldVal, newVal) => {
 if (oldVal === true) {
  eventTarget.value?.playVideo();
 }
 else if (newVal === true) {
  eventTarget.value?.stopVideo();
 }
    
})

</script>

<template>
 <div ref="player"/>
</template>