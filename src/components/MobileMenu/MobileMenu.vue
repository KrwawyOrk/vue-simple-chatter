<script setup>
import { ref } from "vue";
import loginFunctions from "../../functions/loginFunctions.js";
import useUsersOnlineListStateAndFunctions from "../../functions/useUsersOnlineListStateAndFunctions.js";
import userStateAndFunctions from "../../functions/userStateAndFunctions.js";
import useMobileMenuState from "./useMobileMenuState.js";

import AccountProfile from "./pages/AccountProfile.vue";

defineProps({
  changeChatRoom: Function,
});

const { signOutUserFromFirebase } = loginFunctions;
const { getUsersOnlineList } = useUsersOnlineListStateAndFunctions();
const { getUserEmail } = userStateAndFunctions;
const { MOBILEMENU_STATE, getMenuState, setMenuState } = useMobileMenuState();

const menuOpened = ref(null);
</script>

<template>
  <Teleport to="body">
    <AccountProfile
      v-if="getMenuState.value === MOBILEMENU_STATE.ACCOUNT_PROFILE"
      @clicked-returnToMobileMenu="setMenuState(MOBILEMENU_STATE.MAINMENU)"
    />
  </Teleport>

  <button
    @click="() => (menuOpened = !menuOpened)"
    class="
      z-20
      fixed
      top-3
      right-3
      lg:top-10 lg:right-10
      p-2
      rounded
      shadow
      bg-orange-600
      hover:bg-orange-500
      text-white
      font-semibold
    "
  >
    <font-awesome-icon
      icon="fa-solid fa-burger"
      class="fa-xl"
      style="color: white"
    />
  </button>
  <div
    id="mobileMenu"
    class="
      fixed
      z-10
      -top-full
      left-0
      w-full
      min-w-full min-h-screen
      max-h-screen
      bg-gradient-to-b
      from-slate-800
      to-slate-700
    "
    :class="{
      'mobile-menu-open-animation': menuOpened === true,
      'mobile-menu-close-animation': menuOpened === false,
    }"
  >
    <div class="w-full flex justify-center my-5">
      <h1 class="text-white font-semibold">// Hello {{ getUserEmail }}</h1>
    </div>
    <div
      class="
        grid grid-cols-2 grid-rows-3
        md:grid-cols-3 md:grid-rows-2
        justify-items-center
        min-h-screen
        max-h-screen
      "
    >
      <button
        @click="
          () => {
            changeChatRoom('chats');
            menuOpened = false;
          }
        "
        class="menu-button relative"
      >
        <font-awesome-icon
          icon="fa-solid fa-house"
          class="fa-2xl"
          style="color: black"
        />
        <h1>Główny pokój</h1>
      </button>
      <button
        @click="
          () => {
            changeChatRoom('programming');
            menuOpened = false;
          }
        "
        class="menu-button space-y-2"
      >
        <font-awesome-icon
          icon="fa-solid fa-atom"
          class="fa-2xl"
          style="color: black"
        />
        <h1>Programowanie</h1>
      </button>
      <button
        @click="() => { changeChatRoom('games'); menuOpened = false; }"
        class="menu-button relative space-y-2"
      >
        <font-awesome-icon
          icon="fa-solid fa-dice"
          class="fa-2xl"
          style="color: black"
        />
        <h1>Gry komputerowe</h1>
      </button>
      <button
        @click="setMenuState(MOBILEMENU_STATE.ACCOUNT_PROFILE)"
        class="menu-button space-y-2"
      >
        <font-awesome-icon
          icon="fa-solid fa-address-card"
          class="fa-2xl"
          style="color: black"
        />
        <h1>Profil</h1>
      </button>
      <button @click="signOutUserFromFirebase" class="menu-button space-y-2">
        <font-awesome-icon
          icon="fa-solid fa-gear"
          class="fa-2xl"
          style="color: black"
        />
        <h1>Ustawienia</h1>
      </button>

      <button @click="signOutUserFromFirebase" class="menu-button space-y-2">
        <font-awesome-icon
          icon="fa-solid fa-right-from-bracket"
          class="fa-2xl"
          style="color: black"
        />
        <h1>Wyloguj się</h1>
      </button>
    </div>
  </div>
</template>

<style>
.mobile-menu-open-animation {
  animation-name: mobileMenuOpen;
  animation-duration: 0.4s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes mobileMenuOpen {
  to {
    transform: translateY(100%);
  }
}

.mobile-menu-close-animation {
  animation-name: mobileMenuClose;
  animation-duration: 0.4s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes mobileMenuClose {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(-100%);
  }
}

.menu-button {
  @apply bg-slate-100 rounded-xl font-semibold text-slate-800 h-32 w-32 md:h-64 md:w-64 hover:bg-slate-200;
}
</style>