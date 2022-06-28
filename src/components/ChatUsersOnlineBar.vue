<script setup>
import { ref, onMounted } from "vue";
import useUsersOnlineListStateAndFunctions from "../functions/useUsersOnlineListStateAndFunctions.js";
import loginFunctions from "../functions/loginFunctions.js";

const { signOutUserFromFirebase } = loginFunctions;
const { getUsersOnlineList, getListWithOnlineUsers, onUpdateUsersOnlineList } =
  useUsersOnlineListStateAndFunctions();

const showOnlineUsers = ref(true);

onMounted(() => {
  onUpdateUsersOnlineList();
});
</script>

<template>
  <!-- Add the style and icon you want using the String format -->

  <button @click="signOutUserFromFirebase" class="button-logout">
    <div class="flex flex-col space-y-1 h-16 justify-center">
      <font-awesome-icon
        icon="fa-solid fa-right-from-bracket"
        class="fa-xl"
        style="color: white"
      />
      <h1>Wyloguj się</h1>
    </div>
  </button>

  <button
    @click="() => (showOnlineUsers = !showOnlineUsers)"
    class="button-filter mt-2"
  >
  <div class="flex flex-col space-y-1 h-16 justify-center">
      <font-awesome-icon
        icon="fa-solid fa-people-group"
        class="fa-xl"
        style="color: white"
      />
      <h1>{{ showOnlineUsers ? "Pokaż offline" : "Pokaż online" }}</h1>
    </div>
    
  </button>

  <div class="space-y-2 mt-2 mb-2 scroll-smooth overflow-y-auto">
    <div v-for="(user, index) in getUsersOnlineList.value" :key="index">
      <div
        v-if="user.online === showOnlineUsers"
        class="bg-white rounded shadow py-1 px-2 font-light h-20 w-full"
      >
        <h1 class="font-semibold">{{ user.name }}</h1>
        <h1 v-if="user.online" class="text-green-900 font-semibold">online</h1>
        <div v-else>
          <h1 class="text-sm">Last seen: {{ user.lastLoginDate }}</h1>
          <h1 class="text-red-900 font-semibold">offline</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.button-filter {
  @apply bg-slate-600 rounded shadow text-white text-base font-semibold px-6 py-1 text-sm;
  @apply hover:bg-slate-500 focus:bg-slate-500;
}

.button-logout {
  @apply bg-slate-600 rounded shadow text-white text-base font-semibold px-6 py-2;
  @apply hover:bg-slate-500 focus:bg-slate-500;
}
</style>