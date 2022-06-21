<script setup>
import { ref } from "vue";

import Loader from "../components/Loader.vue";
import LoginForm from "../components/LoginForm.vue";
import CreateAccountForm from "../components/CreateAccountForm.vue";
import userStateAndFunctions from "../functions/userStateAndFunctions.js";

const { isLoggingInProgress, isAccountCreationInProgress } =
  userStateAndFunctions;

const loginPageState = ref("loginForm"); //loginForm, createAccountForm
</script>

<template>
  <div
    class="
      w-full
      flex
      items-center
      justify-center
      min-h-screen
      bg-gradient-to-b
      from-slate-800
      to-slate-700
    "
  >
    <div>
      <div class="w-full flex flex-col justify-center items-center space-y-2">
        <h1 class="text-white font-bold text-sm">// Vue Simple Chatter</h1>
        <LoginForm
          v-if="isLoggingInProgress === false && loginPageState === 'loginForm'"
          @clicked-createAccount="loginPageState = 'createAccountForm'"
        />
        <div v-if="isLoggingInProgress" class="mt-5">
          <Loader />
          <h1 class="text-white font-light mt-2">Trwa logowanie ...</h1>
        </div>

        <CreateAccountForm
          v-if="
            isAccountCreationInProgress === false &&
            loginPageState === 'createAccountForm'
          "
          @clicked-returnToLoginForm="loginPageState = 'loginForm'"
        />
        <div
          v-if="isAccountCreationInProgress"
          class="mt-5 w-full flex flex-col justify-center items-center"
        >
          <Loader />
          <h1 class="text-white font-light mt-2">Trwa tworzenie konta ...</h1>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
</style>