<script setup>
import { onMounted, ref, computed } from "vue";

import { firebasePlatform } from "./firebase/firebase_config.js";

import checkAuthorisationStateChange from "./functions/checkAuthorisationStateChange.js";
import listenToUserCloseBrowserTab from "./functions/listenToUserCloseBrowserTab.js";
import userStateAndFunctions from "./functions/userStateAndFunctions";
import Login from "./pages/Login.vue";
import Chat from "./pages/Chat.vue";

const { isUserLoggedIn, getUserEmail } = userStateAndFunctions;

onMounted(() => {
  checkAuthorisationStateChange();
  listenToUserCloseBrowserTab();
});
</script>

<template>
  <Login v-if="isUserLoggedIn === false" />
  <Chat v-else />
</template>

<style>
</style>
