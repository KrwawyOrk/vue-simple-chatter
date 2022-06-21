<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import useErrorMessages from "../functions/useErrorMessages.js";
import userStateAndFunctions from "../functions/userStateAndFunctions.js";

const { isAccountCreationInProgress, setAccountCreationInProgress } =
  userStateAndFunctions;

const { getLoginErrorMessage, setloginErrorMessage, clearLoginErrorMessage } =
  useErrorMessages();

const userEmail = ref("");
const userPassword = ref("");
const userPasswordVerify = ref("");

function clearForm() {
  userEmail.value = "";
  userPassword.value = "";
  userPasswordVerify.value = "";
}

function verifyForm() {
  return (
    userEmail.value.length > 0 ||
    (userPassword.value.length > 0 && userPasswordVerify.value > 0)
  );
}

function createNewUserAccount() {
  setAccountCreationInProgress(true);

  if (getLoginErrorMessage) {
    clearLoginErrorMessage();
  }

  console.log("Creating new user...");

  const auth = getAuth();
  const email = userEmail.value;
  const password = userPassword.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(
        `Created a new user: ${user.email}, ${user.emailVerified}, ${user.isAnonymous}`
      );
    })
    .catch((error) => {
      setAccountCreationInProgress(false);

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);

      setloginErrorMessage(errorMessage);
    });
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-xl">
    <div class="pt-2 px-10 pb-8 text-center">
      <h1 class="text-xl font-bold">Stwórz konto</h1>
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

        <label for="userpassword" class="label-form">Hasło</label>
        <input
          v-model="userPasswordVerify"
          type="password"
          id="userpassword"
          class="input-form"
          placeholder="Potwórz hasło"
        />
      </div>
    </div>
    <div v-if="getLoginErrorMessage" class="w-full text-center py-5">
      <h1 class="font-light font-semibold text-slate-700">
        {{ getLoginErrorMessage }}
      </h1>
    </div>
    <div
      class="
        flex
        justify-center
        items-center
        space-x-2
        bg-slate-200
        px-10
        py-5
        rounded-b-lg
        text-center
      "
    >
      <button @click="createNewUserAccount" class="button-form bg-slate-600">
        Stwórz konto
      </button>
      <button
        @click="$emit('clicked-returnToLoginForm')"
        class="button-form bg-slate-500"
      >
        Powrót
      </button>
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