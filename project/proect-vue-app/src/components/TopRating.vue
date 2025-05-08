<script setup lang="ts">
defineProps<{ rating: Number }>();
</script>

<template>
  <span class="rating-film"> {{ rating }}</span>
</template>

<style scoped>
.rating-film {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  padding: 8px 24px;
  width: 62px;
  height: 48px;
  background: #fff;
  font-weight: 700;
  font-size: 24px;
  line-height: 133%;
  color: #6a5dc2;
  position: absolute;
  left: -12px;
  top: -12px;
}
</style>
