<script setup lang="ts">
import MenuHeader from "./MenuHeader.vue";
import LogoWhite from "../assets/images/svg-sprite/marusja_white.svg";
import Modal from "../views/ModalView.vue";
import { RouterLink } from "vue-router";
import { useAuthorizedStore } from "../stores/autorized";
import { storeToRefs } from "pinia";
import { useModalStore } from "../stores/modal";
import { ref, watch, onMounted } from "vue";
import { checked } from "../api/checkedAuthorized";
import router from "../router/router";
import { useRoute } from "vue-router";
const route = useRoute();
const { authorized, authData } = storeToRefs(useAuthorizedStore());
const { isVis } = storeToRefs(useModalStore());
const changeEntry = ref<string | boolean>("Войти!!");
const isAuth = ref<boolean | string>("");
const widthScreen = ref();
const checkedAuth = async () => {
  if (authData.value) {
    changeEntry.value = authData.value.surname;
  } else {
    changeEntry.value = await checked();
  }
};
checkedAuth();

watch(route, async () => {
  changeEntry.value = await checked();
});
const routeToAutorized = async () => {
  isAuth.value = await checked();
  changeEntry.value = isAuth.value;

  if (!isVis.value && !authorized.value && isAuth.value === "Войти") {
    useModalStore().modalVis();
  } else if (authorized.value) {
    router.push({ name: "favorites" });
  }
};

routeToAutorized();

function resizeMenu(screen: number) {
  if (screen <= 590) {
    changeEntry.value = "";
  } else if (screen > 590) {
    if (!authData.value?.surname) {
      changeEntry.value = "Войти";
    } else if (authData.value?.surname) {
      changeEntry.value = authData.value?.surname;
    }
  }
}

watch(widthScreen, (screen) => {
  resizeMenu(screen);
});

window.addEventListener("resize", () => {
  widthScreen.value = window.outerWidth;
});

onMounted(() => {
  resizeMenu(window.outerWidth);
});
</script>
<template>
  <header class="header">
    <div class="container">
      <div class="header__wrap">
        <router-link to="/" class="header__logo">
          <LogoWhite />
        </router-link>
        <MenuHeader @user="(msg: string) => changeEntry = msg" />
        <router-link
          to="#"
          @click="routeToAutorized"
          :class="{
            header__link: authorized,
            'header__link---default': authorized,
            'header__link--account': !authorized,
          }"
        >
          <span class="header__entry">{{ changeEntry }}</span>
        </router-link>
        <Modal @user="(msg: string) => changeEntry = msg" />
      </div>
    </div>
  </header>
</template>