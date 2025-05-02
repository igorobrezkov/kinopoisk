<script setup lang="ts">
import { useRoute } from 'vue-router';
 const route = useRoute()
</script>

<template>
  <main>
     <router-view :key="route.fullPath"/>
  </main>
</template>