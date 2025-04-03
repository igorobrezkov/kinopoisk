<script setup lang="ts">
import MenuHeader from "./MenuHeader.vue";
import LogoWhite from "../assets/images/svg-sprite/marusja_white.svg";
import Modal from "../views/ModalView.vue";
import { RouterLink } from "vue-router";
import { useAuthorizedStore } from "../stores/autorized";
import { storeToRefs } from "pinia";
import { useModalStore } from "../stores/modal";
const { authorized } = storeToRefs(useAuthorizedStore());
const { isVis } = storeToRefs(useModalStore());

const routeToAutorized = () => {
  if (!isVis.value) {
    useModalStore().modalVis();
  }

  if (!authorized.value) {
    console.log("пользователь не авторизован");
  }
};
</script>
<template>
  <header class="header">
    <div class="container">
      <div class="header__wrap">
        <router-link to="/" class="header__logo">
          <LogoWhite />
        </router-link>
        <MenuHeader />
        <router-link to="#" @click="routeToAutorized" class="header__link">
          Войти
        </router-link>
        <Modal />
      </div>
    </div>
  </header>
</template>