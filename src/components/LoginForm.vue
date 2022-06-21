<script setup>
import { ref } from "vue";

import loginFunctions from "../functions/loginFunctions.js";
import userStateAndFunctions from "../functions/userStateAndFunctions.js";
import useErrorMessages from "../functions/useErrorMessages.js";

const {
  signOutUserFromFirebase,
  loginWithUserEmailAndPassword,
  anonymousLogin,
} = loginFunctions;
const { isUserLoggedIn } = userStateAndFunctions;
const { getLoginErrorMessage } = useErrorMessages();

const userEmail = ref("");
const userPassword = ref("");

function login() {
  if (verifyForm()) {
    loginWithUserEmailAndPassword(userEmail.value, userPassword.value);
    clearForm();
  }
}

function clearForm() {
  userEmail.value = "";
  userPassword.value = "";
}

function verifyForm() {
  return userEmail.value.length > 0 || userPassword.value.length > 0;
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-xl">
    <div class="pt-2 px-10 pb-8 text-center">
      <h1 class="text-xl font-bold">Zaloguj się</h1>
      <h2 class="text-xl">do <strong>Vue Simple Chatter!</strong></h2>
      <hr class="my-5" />

      <div class="flex flex-col text-left space-y-4">
        <label for="userlogin" class="label-form">Login</label>
        <input
          v-model="userEmail"
          type="text"
          id="userlogin"
          class="input-form"
          placeholder="Adres e-mail lub nazwa konta"
        />

        <label for="userpassword" class="label-form">Hasło</label>
        <input
          v-model="userPassword"
          type="password"
          id="userpassword"
          class="input-form"
          placeholder="Hasło"
        />
      </div>
    </div>
    <div v-if="getLoginErrorMessage" class="w-full text-center py-5">
      <h1 class="font-light font-semibold text-slate-700">
        {{ getLoginErrorMessage }}
      </h1>
    </div>
    <div class="flex flex-col bg-slate-200 px-10 py-5 rounded-b-lg">
      <div class="space-x-2">
        <button
          @click="login"
          class="button-form transition delay-150 duration-300 ease-in-out"
        >
          Zaloguj się
        </button>
        <button
          @click="$emit('clicked-createAccount')"
          class="button-form bg-slate-500"
        >
          Nowe konto
        </button>
      </div>
      <div class="flex justify-start mt-2">
        <button
          @click="anonymousLogin"
          class="button-form bg-slate-500 font-normal text-sm px-4 py-1"
        >
          Zaloguj się jako gość
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.label-form {
  @apply font-medium text-sm text-slate-600;
}

.input-form {
  @apply rounded-lg p-2 text-center border h-10;
  @apply text-slate-700 font-semibold;
  @apply focus:outline-none focus:border-slate-400 placeholder-shown:text-sm;
}

.button-form {
  @apply bg-slate-700 rounded shadow text-white text-base font-semibold px-6 py-2;
  @apply hover:bg-slate-600 focus:bg-slate-600;
}
</style>