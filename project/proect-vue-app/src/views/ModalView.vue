<script setup lang="ts">
import {  ref } from "vue";
import { useModalStore } from "../stores/modal"; 
import { useRegistrationStore } from "../stores/registration";
import { storeToRefs } from "pinia";
import CloseModal from "../assets/images/svg-sprite/close_modal.svg";
import BtnAccent from "../components/BtnAccent.vue";
import LogoBlack from "../assets/images/svg-sprite/marusja_black.svg";

import * as EmailValidator from 'email-validator';


const { isVis } = storeToRefs(useModalStore());
const { isRegistration } = storeToRefs(useRegistrationStore());
const { modalClose } = useModalStore();

const text = "Войти";



const inputEmail = ref("");
const inputPass = ref("");
const inputPassConfirm = ref("");
const inputName = ref("");
const inputLastName = ref("");

const inputEmailError = ref(false);
const inputPassError = ref(false);
const inputPassConfirmError = ref(false)
const inputNameError = ref(false)
const inputLastNameError = ref(false)

const errEmail = ref("");
const errPass = ref("");
const errPassConfirm = ref("");

const clearValidInput = () => {
    if (inputEmail.value.length > 0) {
      inputEmailError.value = false;
      errEmail.value = '';
  }

  if (inputPass.value.length > 0) {
    inputPassError.value = false;
    errPass.value = '';
  }

   if (inputPassConfirm.value.length > 0) {
     inputPassConfirmError.value = false;
     errPassConfirm.value = '';
  }

  if (inputName.value.length > 0) {
    inputNameError.value = false;
  }

  if (inputLastName.value.length > 0) {
    inputLastNameError.value = false;
  }
}

const clearDataInput = () => { 
 inputEmail.value = "";
 errEmail.value = "";
 inputPass.value = "";
 errPass.value = "";
 errPassConfirm.value = "";
 inputPassConfirm.value = "";
 inputName.value = "";
 inputLastName.value = "";
}

const clearValid = () => {
  inputEmailError.value = false;
  inputPassError.value = false;
  inputPassConfirmError.value = false;
  inputNameError.value = false;
  inputLastNameError.value = false;
}
const validationForm = () => {
  if (inputEmail.value.length == 0) {
    inputEmailError.value = true;
  }

  if (inputEmail.value.length > 0 && !EmailValidator.validate(inputEmail.value)) {
    errEmail.value = "Ваден некоректный адрес электронной почты";
    inputEmailError.value = true;
  }

  if (inputName.value.length == 0) {
    inputNameError.value = true;
  }
  if (inputLastName.value.length == 0) {
    inputLastNameError.value = true;
  }
   if (inputPass.value.length == 0 || inputPass.value.length < 6) {
    inputPassError.value = true;
  }

  if (inputPass.value.length > 0 && inputPass.value.length < 6) {
    errPass.value = 'Пароль должен содержать 6 и более символов';
  }

  if (inputPassConfirm.value.length == 0) {
    inputPassConfirmError.value = true;
  }

   if (inputPassConfirm.value.length > 0 && inputPassConfirm.value.length < 6) {
    errPassConfirm.value = 'Пароль должен содержать 6 и более символов';
  }

  if (inputPassConfirm.value.length >= 6 && inputPass.value.length >= 6 && inputPassConfirm.value !== inputPass.value) {
    errPassConfirm.value = 'Пароль подтверждения не совпадает'; 
  }
};

const formSend = () => {
  validationForm();
};

const auth = () => {
  clearValid();
  clearDataInput();
  isRegistration.value = false
}

const registration = () => {
  clearValid();
  clearDataInput();
  isRegistration.value = true
}

const modalVis = () => {
  modalClose();
  clearValid();
  isRegistration.value = false;
};


</script>

<template>
  <div class="modal" :class="{ 'modal--vis': isVis }">
    <div class="modal__main">
      <div class="modal__content">
        <LogoBlack class="modal__logo" />
        <h3 v-show="isRegistration" class="modal__registration modal__registration--title">Регистрация</h3>
        <form class="modal__form" >
          <input
            type="email"
            placeholder="Электронная почта"
            class="modal__input modal__input--email"
            :class="{ 'modal__input--error' : inputEmailError, 'modal__email--error' : inputEmailError}"
            v-model="inputEmail" @input="clearValidInput"
          />
          <span class="form__error">{{ errEmail }}</span>
          <input
            type="text"
            placeholder="Имя"
            class="modal__input modal__input--user"
            :class="{ 'modal__input--error' : inputNameError, 'modal__user--error' : inputNameError}"
            v-model="inputName" @input="clearValidInput"
            v-show="isRegistration"
          />
          <input
            type="text"
            placeholder="Фамилия"
            class="modal__input modal__input--user"
            :class="{ 'modal__input--error' : inputLastNameError, 'modal__user--error' : inputLastNameError}"
            v-model="inputLastName" @input="clearValidInput"
            v-show="isRegistration"
          />
          <input
            type="password"
            placeholder="Пароль"
            class="modal__input modal__input--pass"
             :class="{ 'modal__input--error' : inputPassError, 'modal__pass--error' : inputPassError}"
            v-model="inputPass"  @input="clearValidInput"
          />
          <span class="form__error">{{ errPass }}</span>
           <input
            type="password"
            placeholder="Подтвердите пароль"
            class="modal__input modal__input--pass"
             :class="{ 'modal__input--error' : inputPassConfirmError, 'modal__pass--error' : inputPassConfirmError}"
            v-model="inputPassConfirm"
            @input="clearValidInput"
            v-show="isRegistration"
          />
          <span class="form__error">{{ errPassConfirm }}</span>
        </form>
        <BtnAccent :text="text" @click="formSend" />
        <span v-show="!isRegistration" class="modal__registration modal__registration--name" @click="registration">Регистрация</span>
        <span v-show="isRegistration" class="modal__registration modal__registration--name" @click="auth">У меня есть пароль</span>
      </div>

      <CloseModal @click="modalVis" class="modal__close" />
    </div>
  </div>
</template>


<style>
.form__error {
  color:  #ff7575;
}
</style>
