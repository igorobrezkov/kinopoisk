<script setup lang="ts">
import { computed, ref } from "vue";
import { useModalStore } from "../stores/modal"; 
import { useRegistrationStore } from "../stores/registration";
import { useAuthorizedStore } from "../stores/autorized";
import { useFavoritesStore } from "../stores/favorites";
import { storeToRefs } from "pinia";
import CloseModal from "../assets/images/svg-sprite/close_modal.svg";
import BtnAccent from "../components/BtnAccent.vue";
import LogoBlack from "../assets/images/svg-sprite/marusja_black.svg"; 
import { getUser } from "../api/registration"
import { getAuth } from "../api/auth"
import * as EmailValidator from 'email-validator';
import {getProfile } from "../api/profile"

const { isVis } = storeToRefs(useModalStore());
const { isRegistration } = storeToRefs(useRegistrationStore()); 
const { modalClose } = useModalStore();
const { userRegistration } = useRegistrationStore();
const { userAuth } = useRegistrationStore();  
const { userAuthorized, userAuthData } = useAuthorizedStore();
const { addFaforites } = useFavoritesStore();

const emit = defineEmits(['user'])


const text = ref("Войти");
const registrationOk = ref<boolean>(false);

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

const res =  ref<boolean>(true);


const errEmail = ref("");
const errPass = ref("");
const errPassConfirm = ref("");
const errAuth = ref("");

const clearValidInput = () => {
    if (inputEmail.value.length > 0) {
      inputEmailError.value = false;
      errEmail.value = '';
      errAuth.value = '';
  }

  if (inputPass.value.length > 0) {
    inputPassError.value = false;
    errPass.value = '';
    errAuth.value = '';
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
  errAuth.value = "";
 res.value = true;
}

const clearValid = () => {
  inputEmailError.value = false;
  inputPassError.value = false;
  inputPassConfirmError.value = false;
  inputNameError.value = false;
  inputLastNameError.value = false;
  res.value = true;
  errAuth.value = "";
}
const validation = (): boolean => {
     clearValid()
  if (inputEmail.value.length == 0) {
    inputEmailError.value = true;
    res.value = false
  }

  if (inputEmail.value.length > 0 && !EmailValidator.validate(inputEmail.value)) {
    errEmail.value = "Ваден некоректный адрес электронной почты";
    inputEmailError.value = true;
    res.value = false
  }

  if (inputName.value.length == 0 && isRegistration.value) {
    inputNameError.value = true;
    res.value = false
  }
  if (inputLastName.value.length == 0 && isRegistration.value) {
    inputLastNameError.value = true;
    res.value = false
  }
   if (inputPass.value.length == 0 || inputPass.value.length < 6) {
     inputPassError.value = true;
    res.value = false
  }

  if (inputPass.value.length > 0 && inputPass.value.length < 6) {
    errPass.value = 'Пароль должен содержать 6 и более символов';
    res.value = false
  }

  if (inputPassConfirm.value.length == 0 && isRegistration.value) {
    inputPassConfirmError.value = true;
    res.value = false
  }

   if ((inputPassConfirm.value.length > 0 && inputPassConfirm.value.length < 6) && isRegistration.value) {
     errPassConfirm.value = 'Пароль должен содержать 6 и более символов';
    res.value = false
  }

  if (inputPassConfirm.value.length >= 6 && inputPass.value.length >= 6 && inputPassConfirm.value !== inputPass.value && isRegistration.value) {
    errPassConfirm.value = 'Пароль подтверждения не совпадает'; 
    res.value = false
  }
    
  return  res.value
};


const formSend = () => {
  const validateForm = computed(() => validation());
  if (validateForm.value) {
     if (isRegistration.value === false) {
       getAuth(inputEmail.value, inputPass.value).then(result => {
         let values = Object.values(result)
            for (let value of values) {
              if (value === true) {
                
                userAuthorized();
                modalVis();
                getProfile().then(result => {
                  if (result?.data) {
                      emit('user', result.data.surname)
                    userAuthData(result.data);
                    addFaforites();
                  }          
                })
              }
              else if (value === 'User already exists') {
                errEmail.value = "Пользователь с почтой: " + inputEmail.value + " уже есть в системе";
              }

              else {
                errAuth.value = "Данные авторизации введены неверно"
              }
            }
       });
       
            
    }
    else if (isRegistration.value === true) {
        getUser(inputEmail.value, inputPass.value, inputName.value, inputLastName.value)
          .then((result) => {
            let values = Object.values(result)

            for (let value of values) {
              if (value === true) {
                registrationOk.value = true;
                text.value = "Войти";
              }
              else if (value === 'User already exists') {
                errEmail.value = "Пользователь с почтой: " + inputEmail.value + " уже есть в системе";
              }
            }
        })
    }
   
  } 
};

const auth = () => {
  userAuth();
  clearValid();
  clearDataInput();
  text.value = "Войти";
  registrationOk.value = false;
}

const registration = () => {
  userRegistration();
  clearValid();
  clearDataInput();
  text.value = "Создать аккаунт"; 
}

const modalVis = () => {
  isRegistration.value = false;
  registrationOk.value = false;
  text.value = "Войти";
  modalClose();
  clearValid();
  clearDataInput();
  
};


</script>

<template>
  <div class="modal" :class="{ 'modal--vis': isVis }">
    <div class="modal__main">
      <div class="modal__content">
        <LogoBlack class="modal__logo" />
        <h3 v-show="isRegistration" class="modal__registration modal__registration--title">Регистрация <span v-show="registrationOk">завершена</span></h3>
        <span class="modal__ok" v-show="registrationOk">Используйте вашу электронную почту для входа</span>
        <form :class="{ 'modal__form':  !registrationOk , 'none' : registrationOk}" >
          <input
            type="email"
            placeholder="Электронная почта"
            class="modal__input modal__input--email"
            :class="{ 'modal__input--error' : inputEmailError, 'modal__email--error' : inputEmailError}"
            v-model="inputEmail" @input="clearValidInput"
            v-show="!registrationOk"
          />
          <span class="form__error">{{ errEmail }}</span>
          <input
            type="text"
            placeholder="Имя"
            class="modal__input modal__input--user"
            :class="{ 'modal__input--error' : inputNameError, 'modal__user--error' : inputNameError}"
            v-model="inputName" @input="clearValidInput"
            v-show="isRegistration && !registrationOk"
          />
          <input
            type="text"
            placeholder="Фамилия"
            class="modal__input modal__input--user"
            :class="{ 'modal__input--error' : inputLastNameError, 'modal__user--error' : inputLastNameError}"
            v-model="inputLastName" @input="clearValidInput"
            v-show="isRegistration && !registrationOk"
          />
          <input
            type="password"
            placeholder="Пароль"
            class="modal__input modal__input--pass"
             :class="{ 'modal__input--error' : inputPassError, 'modal__pass--error' : inputPassError}"
            v-model="inputPass"  @input="clearValidInput"
            v-show="!registrationOk"
          />
          <span class="form__error">{{ errPass }}</span>
           <input
            type="password"
            placeholder="Подтвердите пароль"
            class="modal__input modal__input--pass"
             :class="{ 'modal__input--error' : inputPassConfirmError, 'modal__pass--error' : inputPassConfirmError}"
            v-model="inputPassConfirm"
            @input="clearValidInput"
            v-show="isRegistration && !registrationOk"
          />
          <span class="form__error">{{ errPassConfirm }}</span>
          <span class="form__error">{{ errAuth }}</span>
        </form>
        <BtnAccent :text="text" @click="formSend" v-if="!registrationOk"/>
        <BtnAccent :text="text" @click="auth" v-else-if="registrationOk"/>
        <span v-show="!isRegistration" class="modal__registration modal__registration--name" @click="registration">Регистрация</span>
        <span v-show="isRegistration && !registrationOk" class="modal__registration modal__registration--name" @click="auth">У меня есть пароль</span>
      </div>

      <CloseModal @click="modalVis" class="modal__close" />
    </div>
  </div>
</template>


<style>
.form__error {
  color:  #ff7575;
  text-align: center;
}

.none {
  display: none;
}
</style>
